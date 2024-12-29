package database

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/models"
	"github.com/surrealdb/surrealdb.go"
	surrealmodels "github.com/surrealdb/surrealdb.go/pkg/models"
)

func (db *DB) CreateCore(name, imageUrl, userId string) (string, error) {

	params := models.DBCore{
		Name:     name,
		ImageURL: imageUrl,
	}

	rawData, err := surrealdb.Create[[]models.DBCore](db.client, surrealmodels.Table("core"), params)
	if err != nil {
		return "", fmt.Errorf("unable to create Core in database: %v", err)
	}

	recordId := *(*rawData)[0].ID

	userRecordId := surrealmodels.RecordID{
		Table: "user",
		ID:    userId,
	}

	userRelation := surrealdb.Relationship{
		Relation: "creator",
		In:       userRecordId,
		Out:      recordId,
	}

	if err = surrealdb.Relate(db.client, &userRelation); err != nil {
		return "", fmt.Errorf("unable to create relation between user and announcement: %v", err)
	}

	return recordId.String(), nil

}

func (db *DB) GetDBCores(_ string) ([]*models.DBCore, error) {
	// TODO: Edit this query to get the following Data
	// query := "SELECT *, creator.* FROM core WHERE creator = $userId OR $userId IN pseudoAdmins OR $userId IN nexus[*].creator OR $userId IN nexus[*].users[0];"
	// params := map[string]interface{}{"userId": userId}

	rawData, err := surrealdb.Select[[]models.DBCore, surrealmodels.Table](db.client, "core")
	if err != nil {
		return nil, fmt.Errorf("unable to fetch Cores: %v", err)
	}

	res := (*rawData)
	cores := make([]*models.DBCore, len(res))

	for _, c := range res {
		cores = append(cores, &c)
	}

	return cores, nil
}

func (db *DB) PromoteToPseudoAdmin(userId, nexusId string) (bool, error) {

	userRecordId := surrealmodels.RecordID{
		Table: "user",
		ID:    userId,
	}

	nexusRecordId := surrealmodels.RecordID{
		Table: "nexus",
		ID:    nexusId,
	}

	userRelation := surrealdb.Relationship{
		Relation: "member",
		In:       userRecordId,
		Out:      nexusRecordId,
		Data:     map[string]any{"role": "PSEUDOADMIN"},
	}

	if err := surrealdb.Relate(db.client, &userRelation); err != nil {
		return false, fmt.Errorf("unable to create relation between user and announcement: %v", err)
	}

	return true, nil
}

func (db *DB) DeleteCore(coreId string) (bool, error) {

	coreRecordId := surrealmodels.RecordID{
		Table: "core",
		ID:    coreId,
	}

	if _, err := surrealdb.Delete[models.DBCore, surrealmodels.RecordID](db.client, coreRecordId); err != nil {
		return false, fmt.Errorf("failed to delete: %v", err)
	}

	return true, nil
}

func (db *DB) GetCoreNameById(id string) (string, error) {

	query := "SELECT name FROM $coreId;"
	params := map[string]interface{}{
		"coreId": id,
	}

	type coreName struct {
		Name string `json:"name"`
	}

	rawData, err := surrealdb.Query[[]*coreName](db.client, query, params)
	if err != nil {
		return "", fmt.Errorf("query failed: %v", err)
	}

	res := (*rawData)[0].Result[0]

	return res.Name, nil
}
