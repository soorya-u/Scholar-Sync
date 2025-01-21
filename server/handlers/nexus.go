package handlers

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/database"
	"github.com/soorya-u/scholar-sync/models"
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

func GetNexusWithDeps(db *database.DB, userId, nexusId string) (*models.Nexus, error) {

	dbNexus, err := db.GetNexusWithDependencies(nexusId)
	if err != nil {
		return nil, err
	}

	nexus := models.Nexus{
		ID:        dbNexus.ID.String(),
		Name:      dbNexus.Name,
		Category:  dbNexus.Category,
		CreatedAt: dbNexus.CreatedAt.Time,
		UpdatedAt: dbNexus.UpdatedAt.Time,
	}

	for _, m := range dbNexus.Members {

		if m.ID.String() == userId {
			nexus.UserRole = models.ProfileType(m.Role)
		}

		nexus.Members = append(nexus.Members, &models.ProfileWithRole{
			ID:        m.ID.String(),
			FullName:  m.FullName,
			Email:     m.Email,
			CreatedAt: m.CreatedAt.Time,
			Role:      models.ProfileType(m.Role),
		})
	}

	for _, a := range dbNexus.Announcements {
		nexus.Announcements = append(nexus.Announcements, &models.Announcement{
			ID:      a.ID.String(),
			Title:   a.Title,
			Message: a.Message,
			SentBy: &models.Profile{
				ID:        a.SentBy.ID.String(),
				FullName:  a.SentBy.FullName,
				Email:     a.SentBy.Email,
				CreatedAt: a.SentBy.CreatedAt.Time,
			},
			Timestamp: a.Timestamp.Time,
		})
	}

	for _, f := range dbNexus.Files {
		nexus.Files = append(nexus.Files, &models.File{
			ID:          f.ID.String(),
			Title:       f.Title,
			Description: f.Description,
			FileName:    f.FileName,
			FileURL:     f.FileURL,
			SentBy: &models.Profile{
				ID:        f.SentBy.ID.String(),
				FullName:  f.SentBy.FullName,
				Email:     f.SentBy.Email,
				CreatedAt: f.SentBy.CreatedAt.Time,
			},
			Timestamp: f.Timestamp.Time,
		})
	}

	return &nexus, nil

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
