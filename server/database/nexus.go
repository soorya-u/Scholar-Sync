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
		"core":      coreId,
	}

	rawData, err := db.client.Create("nexus", params)
	if err != nil {
		return "", fmt.Errorf("unable to add to database: %v", err)
	}

	type NexusID struct {
		Id string
	}

	var nexusId []NexusID

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

func (db *DB) GetNexus(coreId, userId string) ([]*models.Nexus, error) {

	params := map[string]interface{}{
		"core": coreId,
		"user": userId,
	}

	query := "SELECT *, creator.*, core.* FROM nexus WHERE core = $core AND creator = $user OR core.creator = $user OR $user IN users;"

	rawData, err := db.client.Query(query, params)
	if err != nil {
		return nil, fmt.Errorf("unable to retrieve to database: %v", err)
	}

	type Res struct {
		Result []*models.Nexus `json:"result"`
		Status string          `json:"status"`
		Time   string          `json:"time"`
	}

	var parsedData []Res

	err = surrealdb.Unmarshal(rawData, &parsedData)
	if err != nil {
		return nil, fmt.Errorf("unable to unmarshal: %v", err)
	}

	res := parsedData[0].Result

	if len(res) == 0 {
		return nil, nil
	}

	return res, nil

}
