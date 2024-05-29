package database

import (
	"fmt"

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
