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

func GetCoreWithMembersHandler(db *database.DB, userId, coreId string) (*models.Core, error) {
	dbCore, err := db.GetCoreWithMembers(coreId)
	if err != nil {
		return nil, err
	}

	core := models.Core{
		ID:        dbCore.ID.String(),
		Name:      dbCore.Name,
		ImageURL:  dbCore.ImageURL,
		CreatedAt: dbCore.CreatedAt.Time,
		UpdatedAt: dbCore.CreatedAt.Time,
	}

	for _, m := range dbCore.Members {
		if m.ID.String() == userId {
			core.UserRole = models.ProfileType(m.Role)
		}

		core.Members = append(core.Members, &models.ProfileWithRole{
			ID:        m.ID.String(),
			FullName:  m.FullName,
			Email:     m.Email,
			CreatedAt: m.CreatedAt.Time,
			Role:      models.ProfileType(m.Role),
		})
	}

	return &core, nil

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

func LeaveCoreHandler(db *database.DB, userId, coreId string) (bool, error) {
	return db.RemoveMemberRelation(userId, coreId)
}

func RemoveMemberFromCoreHandler(db *database.DB, adminId, userId, coreId string) (bool, error) {
	if isAdmin, err := db.IsAdmin(adminId, coreId); err != nil {
		return false, err
	} else if !isAdmin {
		return false, fmt.Errorf("no privilages to delete nexus")
	}

	return db.RemoveMemberRelation(userId, coreId)
}
