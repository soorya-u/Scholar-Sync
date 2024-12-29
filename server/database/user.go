package database

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
	surrealmodels "github.com/surrealdb/surrealdb.go/pkg/models"
)

func (db *DB) AddNewUser(fullName, email, hashedPassword string) (*models.DBUser, error) {

	params := map[string]interface{}{
		"fullName": fullName,
		"email":    email,
		"password": hashedPassword,
	}

	rawData, err := surrealdb.Create[models.DBUser, surrealmodels.Table](db.client, surrealmodels.Table("user"), params)
	if err != nil {
		return nil, fmt.Errorf("unable to create User in database: %v", err)
	}

	return rawData, nil
}

func (db *DB) GetUserByEmail(email string) (*models.DBUser, error) {

	query := "SELECT * FROM user WHERE email = $email"
	params := map[string]interface{}{"email": email}

	rawData, err := surrealdb.Query[[]models.DBUser](db.client, query, params)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch User: %v", err)
	}

	res := (*rawData)[0].Result

	if len(res) == 0 {
		return nil, nil
	}

	return &res[0], nil
}

func (db *DB) GetProfileByID(id string) (*models.Profile, error) {

	userRecordId := surrealmodels.RecordID{Table: "user", ID: id}

	dbUser, err := surrealdb.Select[models.DBUser, surrealmodels.RecordID](db.client, userRecordId)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch User: %v", err)
	}

	user := models.Profile{
		ID:        dbUser.ID.String(),
		FullName:  dbUser.FullName,
		Email:     dbUser.Email,
		CreatedAt: dbUser.CreatedAt,
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

// TODO: rewrite function later
func (db *DB) AdminCheck(id string) (bool, error) {
	return false, nil
}

// TODO: rewrite function later
func (db *DB) AdminOrPseudoAdminCheck(id string) (bool, error) {
	return false, nil
}

// TODO: rewrite function later
func (db *DB) PseudoAdminCheck(id string) (bool, error) {
	return false, nil
}
