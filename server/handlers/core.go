package handlers

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/database"
	"github.com/soorya-u/scholar-sync/models"
)

func CreateCoreHandler(db *database.DB, payload models.CoreData, userId string) (string, error) {
	coreId, err := db.CreateCore(payload.Name, payload.ImageURL, userId)
	if err != nil {
		return "", err
	}
	return coreId, nil
}

func DeleteCoreHandler(db *database.DB, coreId, userId string) (bool, error) {
	if ok, err := db.IsAdmin(coreId, userId); err != nil {
		return false, err
	} else if !ok {
		return false, fmt.Errorf("no privilages")
	}

	if ok, err := db.DeleteCore(coreId); err != nil {
		return false, err
	} else if !ok {
		return false, fmt.Errorf("unable to delete core")
	}

	return true, nil
}

func LeaveCoreHandler(db *database.DB, nexusId, userId string) (bool, error) {
	return db.RemoveMemberRelation(userId, nexusId)
}
