package database

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
	surrealmodels "github.com/surrealdb/surrealdb.go/pkg/models"
)

func (db *DB) CreateFile(title, description, fileName, fileUrl, nexusId, userId string) (string, error) {

	params := map[string]interface{}{
		"title":       title,
		"description": description,
		"fileUrl":     fileUrl,
		"fileName":    fileName,
	}

	dbFile, err := surrealdb.Create[models.DBFile](db.client, surrealmodels.Table("file"), params)
	if err != nil {
		return "", fmt.Errorf("unable to create file in DB: %v", err)
	}

	recordId := dbFile.ID

	userRecordId := *surrealmodels.ParseRecordID(userId)
	nexusRecordId := *surrealmodels.ParseRecordID(nexusId)

	userToFileRelation := surrealdb.Relationship{
		Relation: "sent",
		In:       userRecordId,
		Out:      recordId,
	}

	nexusToFileRelation := surrealdb.Relationship{
		Relation: "has",
		In:       nexusRecordId,
		Out:      recordId,
	}

	if err = surrealdb.Relate(db.client, &nexusToFileRelation); err != nil {
		return "", fmt.Errorf("unable to create relation between nexus and announcement: %v", err)
	}

	if err = surrealdb.Relate(db.client, &userToFileRelation); err != nil {
		return "", fmt.Errorf("unable to create relation between user and announcement: %v", err)
	}

	return recordId.String(), nil

}

func (db *DB) GetFileByPath(filePath string) (*models.DBFile, error) {
	query := "SELECT * from file WHERE fileUrl = $filePath"
	params := map[string]interface{}{
		"filePath": filePath,
	}

	rawData, err := surrealdb.Query[[]models.DBFile](db.client, query, params)
	if err != nil {
		return nil, fmt.Errorf("error in running query: %v", err)
	}

	res := (*rawData)[0].Result

	if len(res) == 0 {
		return nil, fmt.Errorf("no result found")
	}

	return &res[0], nil

}
