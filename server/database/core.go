package database

import (
	"fmt"
	"time"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
)

func (db *DB) CreateCore(name, imageUrl, userId string) (string, error) {

	params := map[string]interface{}{
		"name":      name,
		"creator":   userId,
		"imageUrl":  imageUrl,
		"createdAt": time.Now(),
		"updatedAt": time.Now(),
	}

	rawData, err := db.client.Create("core", params)
	if err != nil {
		return "", fmt.Errorf("unable to create Core in database: %v", err)
	}

	type CoreID struct {
		Id string
	}

	var coreId []CoreID

	err = surrealdb.Unmarshal(rawData, &coreId)
	if err != nil {
		return "", fmt.Errorf("unable to parse data from database: %v", err)
	}

	return coreId[0].Id, nil

}

func (db *DB) GetCores(userId string) ([]*models.Core, error) {
	// query := "SELECT *, creator.*, nexus[*].*, nexus[*].*.creator.*, nexus[*].*, nexus[*].announcements[*].*, nexus[*].files[*].*, nexus[*].users[*].* FROM core WHERE creator = $userId OR $userId IN pseudoAdmins;"
	query := "SELECT *, creator.*, nexus[*].* FROM core WHERE creator = $userId OR $userId IN nexus[*].creator OR $userId IN nexus[*].users;"
	params := map[string]interface{}{"userId": userId}

	rawData, err := db.client.Query(query, params)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch Cores: %v", err)
	}

	type Res struct {
		Result []*models.Core `json:"result"`
		Status string         `json:"status"`
		Time   string         `json:"time"`
	}
	var parsedData []Res
	// var d []*models.Core

	fmt.Printf("%#v\n\n", rawData)
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
