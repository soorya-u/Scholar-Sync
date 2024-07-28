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

	var coreId []struct {
		Id string
	}

	err = surrealdb.Unmarshal(rawData, &coreId)
	if err != nil {
		return "", fmt.Errorf("unable to parse data from database: %v", err)
	}

	return coreId[0].Id, nil

}

func (db *DB) GetDBCores(userId string) ([]*models.DBCore, error) {
	query := "SELECT *, creator.* FROM core WHERE creator = $userId OR $userId IN pseudoAdmins OR $userId IN nexus[*].creator OR $userId IN nexus[*].users[0];"
	params := map[string]interface{}{"userId": userId}

	rawData, err := db.client.Query(query, params)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch Cores: %v", err)
	}

	var parsedData []struct {
		Result []*models.DBCore `json:"result"`
		Status string           `json:"status"`
		Time   string           `json:"time"`
	}

	err = surrealdb.Unmarshal(rawData, &parsedData)
	if err != nil {
		return nil, fmt.Errorf("unable to unmarshal core: %v", err)
	}

	res := parsedData[0].Result

	if len(res) == 0 {
		return nil, nil
	}

	return res, nil
}

func (db *DB) AddPseudoAdminToCore(userId, coreId string) (bool, error) {

	query := "UPDATE $coreId SET pseudoAdmins+=$userId;"
	params := map[string]interface{}{
		"coreId": coreId,
		"userId": userId,
	}

	_, err := db.client.Query(query, params)
	if err != nil {
		return false, fmt.Errorf("unable to Join: %v", err)
	}

	query = "UPDATE $userId SET userType=$type;"
	params = map[string]interface{}{
		"userId": userId,
		"type":   models.ProfileTypePseudoadmin,
	}

	_, err = db.client.Query(query, params)
	if err != nil {
		return false, fmt.Errorf("unable to Promote User: %v", err)
	}

	return true, nil
}

func (db *DB) DeleteCore(coreId string) (bool, error) {

	if _, err := db.client.Delete(coreId); err != nil {
		return false, fmt.Errorf("failed to delete: %v", err)
	}

	return true, nil
}

func (db *DB) GetCoreNameById(id string) (string, error) {

	query := "SELECT name FROM $coreId;"
	params := map[string]interface{}{
		"coreId": id,
	}

	rawData, err := db.client.Query(query, params)
	if err != nil {
		return "", fmt.Errorf("query failed: %v", err)
	}

	type coreName struct {
		Name string `json:"name"`
	}

	var parsedData []struct {
		Result []*coreName `json:"result"`
		Status string      `json:"status"`
		Time   string      `json:"time"`
	}

	if err = surrealdb.Unmarshal(rawData, &parsedData); err != nil {
		return "", fmt.Errorf("unable to unmarshal core name: %v", err)
	}

	if len(parsedData) <= 0 || len(parsedData[0].Result) <= 0 {
		return "", fmt.Errorf("result not found")
	}

	res := parsedData[0].Result[0]

	return res.Name, nil
}
