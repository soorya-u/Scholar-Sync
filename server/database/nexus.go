package database

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
	surrealmodels "github.com/surrealdb/surrealdb.go/pkg/models"
)

func (db *DB) CreateNexus(name, userId, coreId, category string) (string, error) {

	params := map[string]interface{}{
		"name":     name,
		"category": category,
	}

	dbNexus, err := surrealdb.Create[models.DbNexus](db.client, surrealmodels.Table("nexus"), params)
	if err != nil {
		return "", fmt.Errorf("unable to add to database: %v", err)
	}

	recordId := dbNexus.ID

	userRecordId := *surrealmodels.ParseRecordID(userId)

	coreRecordId := *surrealmodels.ParseRecordID(coreId)

	userRelation := surrealdb.Relationship{
		Relation: "member",
		In:       userRecordId,
		Out:      recordId,
		Data: map[string]any{
			"role": "ADMIN",
		},
	}

	if err = surrealdb.Relate(db.client, &userRelation); err != nil {
		return "", fmt.Errorf("unable to create relation between user and announcement: %v", err)
	}

	coreRelation := surrealdb.Relationship{
		Relation: "contains",
		In:       coreRecordId,
		Out:      recordId,
	}

	if err = surrealdb.Relate(db.client, &coreRelation); err != nil {
		return "", fmt.Errorf("unable to create relation between user and announcement: %v", err)
	}

	query := `
	(SELECT in AS userId
		FROM member 
		WHERE out = $out AND role = "ADMIN")
			.map(|$u| $u.userId);
	`
	params = map[string]any{
		"out": coreRecordId,
	}

	adminRes, err := surrealdb.Query[[]surrealmodels.RecordID](db.client, query, params)
	if err != nil {
		return "", fmt.Errorf("unable to run admin fetching query: %v", err)
	}

	admins := (*adminRes)[0].Result
	if len(admins) == 0 {
		return "", fmt.Errorf("could not find any owner of the code")
	}

	for _, a := range admins {
		coreAdminRelation := surrealdb.Relationship{
			Relation: "member",
			In:       a,
			Out:      recordId,
			Data: map[string]any{
				"role": "ADMIN",
			},
		}

		if err = surrealdb.Relate(db.client, &coreAdminRelation); err != nil {
			return "", fmt.Errorf("unable to relate core admin to nexus: %v", err)
		}
	}

	return recordId.String(), nil

}

func (db *DB) GetNexusWithDependencies(nexusId string) (*models.DbNexusWithDeps, error) {

	nexusRecordId := surrealmodels.ParseRecordID(nexusId)

	query := `
SELECT 
	*, 
  (
		SELECT 
    	in.id AS id, 
      in.fullName as fullName, 
      in.email AS email, 
      in.createdAt AS createdAt, 
      role 
    FROM <-member 
    ORDER BY role
	) AS members, 
  (
		SELECT 
    	out.*,
      (
				SELECT 
					->sentBy.out.*[0] as user 
				FROM out.id
			).user[0] as out.sentBy
    FROM ->has 
    WHERE record::tb(out) == "file"
  ).out AS files, 
  (
		SELECT 
    	out.*,
        (
					SELECT 
						->sentBy.out.*[0] as user 
					FROM out.id
				).user[0] as out.sentBy
    FROM ->has 
    WHERE record::tb(out) == "announcement"
	).out AS announcements 
FROM $nexusId;
`

	params := map[string]interface{}{
		"nexusId": nexusRecordId,
	}

	res, err := surrealdb.Query[[]models.DbNexusWithDeps](db.client, query, params)
	if err != nil || len(*res) == 0 {
		return nil, fmt.Errorf("unable to fetch nexus with deps: %v", err)
	}

	nexus := (*res)[0].Result

	if len(nexus) == 0 {
		return nil, fmt.Errorf("no nexus found")
	}

	return &nexus[0], nil

}

func (db *DB) DeleteNexus(nexusId string) (bool, error) {

	nexusRecordId := surrealmodels.RecordID{Table: "nexus", ID: nexusId}
	if _, err := surrealdb.Delete[models.Nexus, surrealmodels.RecordID](db.client, nexusRecordId); err != nil {
		return false, fmt.Errorf("failed to delete: %v", err)
	}

	return true, nil
}
