package database

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
	surrealmodels "github.com/surrealdb/surrealdb.go/pkg/models"
)

func (db *DB) CreateUser(fullName, email, hashedPassword string) (*models.DbUser, error) {

	params := map[string]interface{}{
		"fullName": fullName,
		"email":    email,
		"password": hashedPassword,
	}

	dbUsers, err := surrealdb.Create[models.DbUser](db.client, surrealmodels.Table("user"), params)
	if err != nil {
		return nil, fmt.Errorf("unable to create User in database: %v", err)
	}

	return dbUsers, nil
}

func (db *DB) GetUserByEmail(email string) (*models.DbUser, error) {

	query := "SELECT * FROM user WHERE email = $email"
	params := map[string]interface{}{"email": email}

	rawData, err := surrealdb.Query[[]models.DbUser](db.client, query, params)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch User: %v", err)
	}

	res := (*rawData)[0].Result

	if len(res) == 0 {
		return nil, nil
	}

	return &res[0], nil
}

func (db *DB) GetUserByID(id string) (*models.DbUser, error) {

	userRecordId := *surrealmodels.ParseRecordID(id)

	dbUser, err := surrealdb.Select[models.DbUser](db.client, userRecordId)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch User: %v", err)
	}

	return dbUser, nil

}

// TODO: Try Converting Reverse Tree to Tree Using Query
func (db *DB) GetUserReverseTree(id string) (*[]models.DbReverseTree, error) {
	userRecordId := *surrealmodels.ParseRecordID(id)

	query := `
SELECT 
	id, 
	name, 
	category, 
	(SELECT 
		id, 
		name, 
		imageUrl 
	FROM 
		<-contains[0].in)[0] as core 
FROM nexus 
WHERE $userId IN <-member.in;
`

	params := map[string]interface{}{"userId": userRecordId}

	res, err := surrealdb.Query[[]models.DbReverseTree](db.client, query, params)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch data: %v", err)
	}

	revTree := (*res)[0].Result

	return &revTree, nil
}
