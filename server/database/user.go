package database

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
	surrealmodels "github.com/surrealdb/surrealdb.go/pkg/models"
)

func (db *DB) CreateUser(fullName, email, hashedPassword string) (*models.DBUser, error) {

	params := map[string]interface{}{
		"fullName": fullName,
		"email":    email,
		"password": hashedPassword,
	}

	dbUsers, err := surrealdb.Create[models.DBUser](db.client, surrealmodels.Table("user"), params)
	if err != nil {
		return nil, fmt.Errorf("unable to create User in database: %v", err)
	}

	return dbUsers, nil
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

func (db *DB) GetUserByID(id string) (*models.DBUser, error) {

	userRecordId := *surrealmodels.ParseRecordID(id)

	dbUser, err := surrealdb.Select[models.DBUser](db.client, userRecordId)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch User: %v", err)
	}

	return dbUser, nil

}
