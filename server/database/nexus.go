package database

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
	surrealmodels "github.com/surrealdb/surrealdb.go/pkg/models"
)

func (db *DB) CreateNexus(name, userId, coreId, category string) (string, error) {

	params := map[string]interface{}{
		"category": category,
		"name":     name,
		"creator":  userId,
	}

	rawData, err := surrealdb.Create[models.DBNexus, surrealmodels.Table](db.client, "nexus", params)
	if err != nil {
		return "", fmt.Errorf("unable to add to database: %v", err)
	}

	recordId := *(*rawData).ID

	userRecordId := surrealmodels.RecordID{
		Table: "user",
		ID:    userId,
	}

	coreRecordId := surrealmodels.RecordID{
		Table: "core",
		ID:    coreId,
	}

	userRelation := surrealdb.Relationship{
		Relation: "member",
		In:       userRecordId,
		Out:      recordId,
		Data: map[string]any{
			"role": "PSEUDOUSER",
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

	// TODO: Get Creator of Core and Set Him as ADMIN of the Nexus

	return recordId.String(), nil

}

func (db *DB) GetDBNexus(nexusIds []string) ([]*models.DBNexus, error) {

	nexusRecordIds := make([]surrealmodels.RecordID, len(nexusIds))
	for _, n := range nexusIds {
		nexusRecordIds = append(nexusRecordIds, surrealmodels.RecordID{Table: "file", ID: n})
	}

	dbNexus, err := surrealdb.Select[[]models.DBNexus, []surrealmodels.RecordID](db.client, nexusRecordIds)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch files: %v", err)
	}

	nexusPts := make([]*models.DBNexus, len(*dbNexus))
	for _, n := range *dbNexus {
		nexusPts = append(nexusPts, &models.DBNexus{
			ID:        n.ID,
			Name:      n.Name,
			Category:  n.Category,
			CreatedAt: n.CreatedAt,
			UpdatedAt: n.UpdatedAt,
		})
	}

	return nexusPts, nil

}

// TODO: Below Function is Exhaustive. Write better code
func (db *DB) GetNexusNameById(id string) (string, error) {
	nexus, err := db.GetDBNexus([]string{id})
	if err != nil {
		return "", err
	}

	return nexus[0].Name, nil
}

func (db *DB) DeleteNexus(nexusId string) (bool, error) {

	nexusRecordId := surrealmodels.RecordID{Table: "nexus", ID: nexusId}
	if _, err := surrealdb.Delete[models.Nexus, surrealmodels.RecordID](db.client, nexusRecordId); err != nil {
		return false, fmt.Errorf("failed to delete: %v", err)
	}

	return true, nil
}

func (db *DB) AddUserToNexus(userId, nexusId string) (bool, error) {

	userRecordId := surrealmodels.RecordID{
		Table: "user",
		ID:    userId,
	}

	nexusRecordId := surrealmodels.RecordID{
		Table: "nexus",
		ID:    nexusId,
	}

	userRelation := surrealdb.Relationship{
		Relation: "member",
		In:       userRecordId,
		Out:      nexusRecordId,
		Data: map[string]any{
			"role": "NORMAL",
		},
	}

	if err := surrealdb.Relate(db.client, &userRelation); err != nil {
		return false, fmt.Errorf("unable to create relation between user and announcement: %v", err)
	}

	return true, nil
}

// Invalid Function. Change it Later
func (db *DB) RemoveUserFromNexus(userId, nexusId string) (bool, error) {
	query := "UPDATE $nexusId SET users-=$userId;"
	params := map[string]interface{}{
		"nexusId": nexusId,
		"userId":  userId,
	}
	if _, err := surrealdb.Query[any](db.client, query, params); err != nil {
		return false, fmt.Errorf("unable to join: %v", err)
	}

	return true, nil
}
