package handlers

import (
	"github.com/soorya-u/scholar-sync/database"
	"github.com/soorya-u/scholar-sync/models"
)

func GetUserHandler(db *database.DB, userId string) (*models.Profile, error) {
	dbUser, err := db.GetUserByID(userId)
	if err != nil {
		return nil, err
	}

	user := &models.Profile{
		ID:        dbUser.ID.String(),
		FullName:  dbUser.FullName,
		Email:     dbUser.Email,
		CreatedAt: dbUser.CreatedAt.Time,
	}

	return user, nil

}
