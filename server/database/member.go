package database

import (
	"fmt"

	surrealdb "github.com/surrealdb/surrealdb.go"
	surrealmodels "github.com/surrealdb/surrealdb.go/pkg/models"
)

func (db *DB) IsAdmin(userId, coreOrNexusId string) (bool, error) {
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

func (db *DB) IsMember(userId, coreOrNexusId string) (bool, error) {
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

func (db *DB) AddMemberRelation(userId, coreOrNexusId, role string) (bool, error) {
	userRecordId := *surrealmodels.ParseRecordID(userId)
	coreOrNexusRecordId := *surrealmodels.ParseRecordID(coreOrNexusId)

	memberRelation := surrealdb.Relationship{
		Relation: surrealmodels.Table("member"),
		In:       userRecordId,
		Out:      coreOrNexusRecordId,
		Data: map[string]any{
			"role": role,
		},
	}

	if err := surrealdb.Relate(db.client, &memberRelation); err != nil {
		return false, fmt.Errorf("unable to create relation between user and announcement: %v", err)
	}

	return true, nil
}

func (db *DB) RemoveMemberRelation(userId, coreOrNexusId string) (bool, error) {
	userRecordId := *surrealmodels.ParseRecordID(userId)
	coreOrNexuRecordId := *surrealmodels.ParseRecordID(coreOrNexusId)

	sql := "DELETE FROM member WHERE in=$in and out=$out"
	params := map[string]any{
		"in":  userRecordId,
		"out": coreOrNexuRecordId,
	}

	query := []surrealdb.QueryStmt{
		{
			SQL:  sql,
			Vars: params,
		},
	}

	if err := surrealdb.QueryRaw(db.client, &query); err != nil {
		return false, err
	}

	return true, nil

}
