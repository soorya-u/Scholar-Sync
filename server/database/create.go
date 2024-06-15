package database

import (
	"fmt"
	"time"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
)

func (db *DB) AddNewUser(fullName string, email string, hashedPassword string) (*models.User, error) {

	params := map[string]interface{}{
		"fullName": fullName,
		"email":    email,
		"password": hashedPassword,
	}

	rawData, err := db.client.Create("user", params)
	if err != nil {
		return nil, fmt.Errorf("unable to create User in database: %v", err)
	}

	var user []models.User

	err = surrealdb.Unmarshal(rawData, &user)
	if err != nil {
		return nil, fmt.Errorf("unable to parse data from database: %v", err)
	}

	return &user[0], nil
}

func (db *DB) CreateCore(name string, userId string) (string, error) {

	params := map[string]interface{}{
		"name":      name,
		"creator":   userId,
		"createdAt": time.Now(),
		"updatedAt": time.Now(),
	}

	rawData, err := db.client.Create("core", params)
	if err != nil {
		return "", fmt.Errorf("unable to create Core in database: %v", err)
	}

	type CoreID struct {
		id string
	}

	var coreId []CoreID

	err = surrealdb.Unmarshal(rawData, &coreId)
	if err != nil {
		return "", fmt.Errorf("unable to parse data from database: %v", err)
	}

	return coreId[0].id, nil

}
