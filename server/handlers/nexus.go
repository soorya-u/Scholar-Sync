package handlers

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/database"
)

func CreateNexusHandler(db *database.DB, name, userId, coreId, category string) (string, error) {
	if isMember, err := db.IsMember(userId, coreId); err != nil {
		return "", err
	} else if !isMember {
		return "", fmt.Errorf("no privilages to create a nexus")
	}

	nexusId, err := db.CreateNexus(name, userId, coreId, category)
	if err != nil {
		return "", err
	}

	return nexusId, nil
}

func DeleteNexusHandler(db *database.DB, nexusId, userId string) (bool, error) {

	if isAdmin, err := db.IsAdmin(userId, nexusId); err != nil {
		return false, err
	} else if !isAdmin {
		return false, fmt.Errorf("no privilages to delete nexus")
	}

	if ok, err := db.DeleteNexus(nexusId); err != nil {
		return false, err
	} else if !ok {
		return false, fmt.Errorf("unable to delete nexus")
	}

	return true, nil
}

func RemoveMemberFromNexusHandler(db *database.DB, adminId, userId, nexusId string) (bool, error) {
	if isAdmin, err := db.IsAdmin(adminId, nexusId); err != nil {
		return false, err
	} else if !isAdmin {
		return false, fmt.Errorf("no privilages to delete nexus")
	}

	return db.RemoveMemberRelation(userId, nexusId)
}

func LeaveNexusHandler(db *database.DB, userId, nexusId string) (bool, error) {
	return db.RemoveMemberRelation(userId, nexusId)
}
