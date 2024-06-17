package database

import (
	"fmt"
	"time"

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
