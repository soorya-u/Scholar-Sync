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

	dbCore, err := surrealdb.Create[models.DBCore](db.client, surrealmodels.Table("core"), params)
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

	if _, err := surrealdb.Delete[models.DBCore](db.client, coreRecordId); err != nil {
		return false, fmt.Errorf("failed to delete: %v", err)
	}

	return true, nil
}
