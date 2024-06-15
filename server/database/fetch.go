package database

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
)

func (db *DB) GetUserByEmail(email string) (*models.User, error) {

	query := "SELECT * FROM user WHERE email = $email"
	params := map[string]interface{}{"email": email}

	rawData, err := db.client.Query(query, params)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch User: %v", err)
	}

	type Res struct {
		Result []models.User `json:"result"`
		Status string        `json:"status"`
		Time   string        `json:"time"`
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

	return &res[0], nil
}

func (db *DB) GetProfileByID(id string) (*models.Profile, error) {
	rawData, err := db.client.Select(id)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch User: %v", err)
	}

	var user []models.Profile

	err = surrealdb.Unmarshal(rawData, &user)
	if err != nil {
		return nil, fmt.Errorf("unable to unmarshal: %v", err)
	}

	if len(user) == 0 {
		return nil, fmt.Errorf("user not found")
	}

	return &user[0], nil

}

// func (db *DB) GetUserByID(id string) (*models.User, error) {
// 	rawData, err := db.client.Select(id)
// 	if err != nil {
// 		return nil, fmt.Errorf("unable to fetch User: %v", err)
// 	}

// 	var user []models.Profile

// 	err = surrealdb.Unmarshal(rawData, &user)
// 	if err != nil {
// 		return nil, fmt.Errorf("unable to unmarshal: %v", err)
// 	}

// 	if len(user) == 0 {
// 		return nil, fmt.Errorf("user not found")
// 	}

// 	return &user[0], nil

// }
