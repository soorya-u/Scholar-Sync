package database

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
)

func (db *DB) IsUserRegisteredByEmail(email string) (bool, error) {

	query := "SELECT * FROM user WHERE email = $email"
	params := map[string]interface{}{"email": email}

	rawData, err := db.client.Query(query, params)
	if err != nil {
		return true, fmt.Errorf("unable to fetch User: %v", err)
	}

	type Res struct {
		Result []models.User `json:"result"`
		Status string        `json:"status"`
		Time   string        `json:"time"`
	}

	var parsedData []Res

	err = surrealdb.Unmarshal(rawData, &parsedData)
	if err != nil {
		return true, fmt.Errorf("unable to unmarshal: %v", err)
	}

	res := parsedData[0].Result

	return len(res) != 0, nil
}
