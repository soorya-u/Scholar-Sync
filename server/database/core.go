package database

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
	surrealmodels "github.com/surrealdb/surrealdb.go/pkg/models"
)

func (db *DB) CreateCore(name, imageUrl, userId string) (string, error) {

	params := map[string]string{
		"name":     name,
		"imageUrl": imageUrl,
	}

	dbCore, err := surrealdb.Create[models.DbCore](db.client, surrealmodels.Table("core"), params)
	if err != nil {
		return "", fmt.Errorf("unable to create Core in database: %v", err)
	}

	recordId := dbCore.ID

	userRecordId := *surrealmodels.ParseRecordID(userId)

	userRelation := surrealdb.Relationship{
		Relation: "member",
		In:       userRecordId,
		Out:      recordId,
		Data:     map[string]any{"role": "ADMIN"},
	}

	if err = surrealdb.Relate(db.client, &userRelation); err != nil {
		return "", fmt.Errorf("unable to create relation between user and announcement: %v", err)
	}

	return recordId.String(), nil

}

func (db *DB) DeleteCore(coreId string) (bool, error) {

	coreRecordId := *surrealmodels.ParseRecordID(coreId)

	if _, err := surrealdb.Delete[models.DbCore](db.client, coreRecordId); err != nil {
		return false, fmt.Errorf("failed to delete: %v", err)
	}

	return true, nil
}

func (db *DB) GetCoreWithMembers(coreId string) (*models.DbCoreWithMembers, error) {
	coreRecordId := *surrealmodels.ParseRecordID(coreId)

	query := `
SELECT 
  *, 
  array::flatten(
    <-member.in
      .map(|$u| 
        SELECT 
          id, 
          fullName, 
          email, 
          createdAt, 
          ->member
            .find(|$m| 
              $m.core == $coreId
            ).role as role 
        FROM $u
        ORDER BY role
      )
  ) as members 
FROM $coreId;
`

	params := map[string]interface{}{
		"coreId": coreRecordId,
	}

	res, err := surrealdb.Query[[]models.DbCoreWithMembers](db.client, query, params)
	if err != nil || len(*res) == 0 {
		return nil, fmt.Errorf("unable to fetch core with members: %v", err)
	}

	cores := (*res)[0].Result

	if len(cores) == 0 {
		return nil, fmt.Errorf("no core found")
	}

	return &cores[0], nil

}
