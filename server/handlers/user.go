package handlers

import (
	"github.com/soorya-u/scholar-sync/database"
	"github.com/soorya-u/scholar-sync/models"
)

func GetUserHandler(db *database.DB, userId string) (*models.Profile, error) {
	user, err := db.GetProfileByID(userId)
	if err != nil {
		return nil, err
	}

	return user, nil
}
