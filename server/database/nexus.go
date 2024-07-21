package database

import (
	"fmt"
	"time"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
)

func (db *DB) CreateNexus(name, userId, coreId, category string) (string, error) {

	params := map[string]interface{}{
		"category":  category,
		"name":      name,
		"creator":   userId,
		"createdAt": time.Now(),
		"updatedAt": time.Now(),
	}

	rawData, err := db.client.Create("nexus", params)
	if err != nil {
		return "", fmt.Errorf("unable to add to database: %v", err)
	}

	var nexusId []struct {
		Id string
	}

	err = surrealdb.Unmarshal(rawData, &nexusId)
	if err != nil {
		return "", fmt.Errorf("unable to unmarshal: %v", err)
	}

	res := nexusId[0].Id

	query := "UPDATE $coreId SET nexus+=$nexusId;"
	params = map[string]interface{}{
		"coreId":  coreId,
		"nexusId": res,
	}

	_, err = db.client.Query(query, params)
	if err != nil {
		return "", fmt.Errorf("unable to Join: %v", err)
	}

	return res, nil

}

func (db *DB) GetDBNexus(nexusIds []string) ([]*models.DBNexus, error) {
	query := "SELECT *, creator.*, users.*.* FROM $nexusIds;"
	params := map[string]interface{}{
		"nexusIds": nexusIds,
	}

	rawData, err := db.client.Query(query, params)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch nexus: %v", err)
	}

	var parsedData []struct {
		Result []*models.DBNexus `json:"result"`
		Status string            `json:"status"`
		Time   string            `json:"time"`
	}

	err = surrealdb.Unmarshal(rawData, &parsedData)
	if err != nil {
		return nil, fmt.Errorf("unable to unmarshall nexus: %v", err)
	}

	res := parsedData[0].Result

	if len(res) <= 0 {
		return nil, nil
	}

	return res, nil

}

func (db *DB) AddUserToNexus(userId, nexusId string, endConnection bool) (bool, error) {
	query := "UPDATE $nexusId SET users+=$userId;"
	params := map[string]interface{}{
		"nexusId": nexusId,
		"userId":  userId,
	}
	_, err := db.client.Query(query, params)
	if err != nil {
		return false, fmt.Errorf("unable to Join: %v", err)
	}

	if endConnection {
		db.client.Close()
	}

	return true, nil
}
