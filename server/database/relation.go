package database

import (
	surrealdb "github.com/surrealdb/surrealdb.go"
	surrealmodels "github.com/surrealdb/surrealdb.go/pkg/models"
)

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
