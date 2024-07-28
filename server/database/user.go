package database

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
)

func (db *DB) AddNewUser(fullName, email, hashedPassword string) (*models.User, error) {

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

func (db *DB) GetUserByEmail(email string) (*models.User, error) {

	query := "SELECT * FROM user WHERE email = $email"
	params := map[string]interface{}{"email": email}

	rawData, err := db.client.Query(query, params)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch User: %v", err)
	}

	var parsedData []struct {
		Result []models.User `json:"result"`
		Status string        `json:"status"`
		Time   string        `json:"time"`
	}

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

	var user models.Profile

	err = surrealdb.Unmarshal(rawData, &user)
	if err != nil {
		return nil, fmt.Errorf("unable to unmarshal: %v", err)
	}

	return &user, nil

}

// TODO: Below Function is Exhaustive. Write better code
func (db *DB) GetUserFullNameById(id string) (string, error) {
	user, err := db.GetProfileByID(id)
	if err != nil {
		return "", err
	}

	return user.FullName, nil
}

func (db *DB) AdminCheck(id string) (bool, error) {
	if profile, err := db.GetProfileByID(id); err != nil {
		return false, err
	} else {
		return profile.UserType == models.ProfileTypeAdmin, nil
	}
}

func (db *DB) AdminOrPseudoAdminCheck(id string) (bool, error) {
	if profile, err := db.GetProfileByID(id); err != nil {
		return false, err
	} else {
		return (profile.UserType == models.ProfileTypeAdmin || profile.UserType == models.ProfileTypePseudoadmin), nil
	}
}

func (db *DB) PseudoAdminCheck(id string) (bool, error) {
	if profile, err := db.GetProfileByID(id); err != nil {
		return false, err
	} else {
		return profile.UserType == models.ProfileTypePseudoadmin, nil
	}
}
