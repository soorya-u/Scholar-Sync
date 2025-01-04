package handlers

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/database"
)

func CreateAnnouncementHandler(db *database.DB, title, message, nexusId, userId string) (string, error) {
	if isAdmin, err := db.IsAdmin(userId, nexusId); err != nil {
		return "", err
	} else if !isAdmin {
		return "", fmt.Errorf("no privilages to upload file")
	}

	return db.CreateAnnouncement(title, message, nexusId, userId)

}
