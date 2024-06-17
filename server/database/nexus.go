package database

import (
	"fmt"
	"time"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
)

func (db *DB) CreateNexus(name, userId, coreId string, category int) (string, error) {

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
		return "", fmt.Errorf("Unable to Add to Database: %v", err)
	}

	var nexus []models.Nexus

	err = surrealdb.Unmarshal(rawData, &nexus)
	if err != nil {
		return "", fmt.Errorf("Unable to Unmarshal: %v", err)
	}

	return nexus[0].ID, nil

}
