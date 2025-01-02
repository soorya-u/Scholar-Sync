package handlers

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/database"
)

func CreateNexusHandler(db *database.DB, name, userId, coreId, category string) (string, error) {
	// Add a Check to see if the User is Member of the Core

	nexusId, err := db.CreateNexus(name, userId, coreId, category)
	if err != nil {
		return "", err
	}

	return nexusId, nil
}

func DeleteNexusHandler(db *database.DB, nexusId, userId string) (bool, error) {
	//  Add Admin Check
	if ok, err := db.DeleteNexus(nexusId); err != nil {
		return false, err
	} else if !ok {
		return false, fmt.Errorf("unable to delete nexus")
	}

	return true, nil
}
