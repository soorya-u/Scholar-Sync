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

	dbUsers, err := surrealdb.Create[models.DBUser](db.client, surrealmodels.Table("user"), params)
	if err != nil {
		return nil, fmt.Errorf("unable to create User in database: %v", err)
	}

	fmt.Printf("\n\n%+v\n\n", *dbUsers)

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

func (db *DB) GetProfileByID(id string) (*models.Profile, error) {

	userRecordId := *surrealmodels.ParseRecordID(id)

	dbUser, err := surrealdb.Select[models.DBUser](db.client, userRecordId)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch User: %v", err)
	}

	user := models.Profile{
		ID:        dbUser.ID.String(),
		FullName:  dbUser.FullName,
		Email:     dbUser.Email,
		CreatedAt: dbUser.CreatedAt.Time,
	}

	return &user, nil

}

func (db *DB) GetUserFullNameById(id string) (string, error) {
	user, err := db.GetProfileByID(id)
	if err != nil {
		return "", err
	}

	return user.FullName, nil
}

func (db *DB) IsAdmin(coreOrNexusId, userId string) (bool, error) {

	userRecordId := *surrealmodels.ParseRecordID(userId)
	coreOrNexusRecordId := *surrealmodels.ParseRecordID(coreOrNexusId)

	query := "SELECT role FROM member WHERE in=$in AND out=$out"
	params := map[string]any{
		"in":  userRecordId,
		"out": coreOrNexusRecordId,
	}

	queryRes, err := surrealdb.Query[[]struct{ Role string }](db.client, query, params)
	if err != nil {
		return false, fmt.Errorf("unable to query role: %v", err)
	}

	res := (*queryRes)[0].Result

	if len(res) == 0 {
		return false, fmt.Errorf("no relation found")
	}

	isAdmin := res[0].Role == "ADMIN"

	return isAdmin, nil
}

func (db *DB) IsMember(coreOrNexusId, userId string) (bool, error) {

	userRecordId := *surrealmodels.ParseRecordID(userId)
	coreOrNexusRecordId := *surrealmodels.ParseRecordID(coreOrNexusId)

	query := "SELECT role FROM member WHERE in=$in AND out=$out"
	params := map[string]any{
		"in":  userRecordId,
		"out": coreOrNexusRecordId,
	}

	queryRes, err := surrealdb.Query[[]struct{ Role string }](db.client, query, params)
	if err != nil {
		return false, fmt.Errorf("unable to query role: %v", err)
	}

	res := (*queryRes)[0].Result

	return len(res) != 0, nil
}
