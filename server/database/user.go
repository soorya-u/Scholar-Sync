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

// TODO: Try Converting Reverse Tree to Tree Using Query
func (db *DB) GetUserReverseTree(id string) (*[]models.DBReverseTree, error) {
	userRecordId := *surrealmodels.ParseRecordID(id)

	query := `
SELECT 
  out.id AS id, 
  out.name AS name,
  (SELECT 
    in.id AS id, 
    in.name AS name
      FROM contains WHERE 
        out == out
  )[0] as core
    FROM member WHERE 
      in = $userId AND 
      record::tb(out.id) == "nexus"
`

	params := map[string]interface{}{"userId": userRecordId}

	res, err := surrealdb.Query[[]models.DBReverseTree](db.client, query, params)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch data: %v", err)
	}

	revTree := (*res)[0].Result

	return &revTree, nil
}
