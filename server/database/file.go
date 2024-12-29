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
		"sentBy":      userId,
	}

	rawData, err := surrealdb.Create[[]models.DBFile](db.client, surrealmodels.Table("file"), params)
	if err != nil {
		return "", fmt.Errorf("unable to create file in DB: %v", err)
	}

	recordId := *(*rawData)[0].ID

	nexusRecordId := surrealmodels.RecordID{
		Table: "nexus",
		ID:    nexusId,
	}

	userRelation := surrealdb.Relationship{
		Relation: "has",
		In:       nexusRecordId,
		Out:      recordId,
	}

	if err = surrealdb.Relate(db.client, &userRelation); err != nil {
		return "", fmt.Errorf("unable to create relation between user and announcement: %v", err)
	}

	return recordId.String(), nil

}

func (db *DB) GetFiles(fileIds []string) ([]*models.File, error) {
	// TODO: Get User as well
	fileRecordIds := make([]surrealmodels.RecordID, len(fileIds))
	for _, f := range fileIds {
		fileRecordIds = append(fileRecordIds, surrealmodels.RecordID{Table: "file", ID: f})
	}

	dbFiles, err := surrealdb.Select[[]models.DBFile, []surrealmodels.RecordID](db.client, fileRecordIds)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch files: %v", err)
	}

	filepts := make([]*models.File, len(*dbFiles))
	for _, f := range *dbFiles {
		filepts = append(filepts, &models.File{
			ID:          f.ID.String(),
			Title:       f.Title,
			Description: f.Description,
			FileURL:     f.FileURL,
			FileName:    f.FileName,
			// TODO: Change Later
			SentBy:    nil,
			TimeStamp: f.Timestamp,
		})
	}

	return filepts, nil

}

func (db *DB) GetFilenameByPath(filePath string) (string, error) {
	query := "SELECT * from file WHERE fileUrl = $filePath"
	params := map[string]interface{}{
		"filePath": filePath,
	}

	rawData, err := surrealdb.Query[[]*models.DBFile](db.client, query, params)
	if err != nil {
		return "", fmt.Errorf("error in running query: %v", err)
	}

	res := (*rawData)[0].Result

	if len(res) <= 0 {
		return "", fmt.Errorf("no result found")
	}

	return res[0].FileName, nil

}
