package database

import (
	"fmt"
	"time"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
)

func (db *DB) CreateFile(title, description, fileName, fileUrl, nexusId, userId string) (string, error) {

	params := map[string]interface{}{
		"title":       title,
		"description": description,
		"fileUrl":     fileUrl,
		"fileName":    fileName,
		"sentBy":      userId,
		"timeStamp":   time.Now(),
	}

	rawData, err := db.client.Create("file", params)
	if err != nil {
		return "", fmt.Errorf("unable to create file in DB: %v", err)
	}

	var fileId []struct {
		Id string
	}

	err = surrealdb.Unmarshal(rawData, &fileId)
	if err != nil {
		return "", fmt.Errorf("unable to unmarshal created file: %v", err)
	} else if len(fileId) <= 0 {
		return "", fmt.Errorf("unable to find unmarshalled value of file")
	}

	res := fileId[0].Id

	query := "UPDATE $nexusId SET files+=$fileId;"
	params = map[string]interface{}{
		"nexusId": nexusId,
		"fileId":  res,
	}

	_, err = db.client.Query(query, params)
	if err != nil {
		return "", fmt.Errorf("unable to Join: %v", err)
	}

	return res, nil

}

func (db *DB) GetFiles(fileIds []string) ([]*models.File, error) {
	query := "SELECT *, sentBy.* FROM $fileIds;"
	params := map[string]interface{}{
		"fileIds": fileIds,
	}

	rawData, err := db.client.Query(query, params)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch files: %v", err)
	}

	var parsedData []struct {
		Result []*models.File `json:"result"`
		Status string         `json:"status"`
		Time   string         `json:"time"`
	}

	err = surrealdb.Unmarshal(rawData, &parsedData)
	if err != nil {
		return nil, fmt.Errorf("unable to unmarshal files: %v", err)
	}

	res := parsedData[0].Result

	if len(res) <= 0 {
		return nil, nil
	}

	return res, nil

}

func (db *DB) GetFilenameByPath(filePath string) (string, error) {
	query := "SELECT *, sentBy.* from file WHERE fileUrl = $filePath"
	params := map[string]interface{}{
		"filePath": filePath,
	}

	rawData, err := db.client.Query(query, params)
	if err != nil {
		return "", fmt.Errorf("error in running query: %v", err)
	}

	var parsedData []struct {
		Result []*models.File `json:"result"`
		Status string         `json:"status"`
		Time   string         `json:"time"`
	}

	if err = surrealdb.Unmarshal(rawData, &parsedData); err != nil {
		return "", fmt.Errorf("unable to unmarshal: %v", err)
	}

	res := parsedData[0].Result

	if len(res) <= 0 {
		return "", fmt.Errorf("no result found")
	}

	return res[0].FileName, nil

}
