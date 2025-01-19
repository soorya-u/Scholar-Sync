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

func GetUserTree(db *database.DB, userId string) ([]*models.Tree, error) {

	revTree, err := db.GetUserReverseTree(userId)
	if err != nil {
		return nil, err
	}

	tree := []*models.Tree{}

	for _, rt := range *revTree {
		coreId := rt.Core.ID.String()
		isFound := false

		for _, t := range tree {
			if t.ID == coreId {
				t.Nexus = append(t.Nexus, &models.BareNexus{
					ID:       rt.ID.String(),
					Name:     rt.Name,
					Category: rt.Category,
				})
				isFound = true
				break
			}
		}
		if !isFound {
			tree = append(tree, &models.Tree{
				ID:       rt.Core.ID.String(),
				Name:     rt.Core.Name,
				ImageURL: rt.Core.ImageURL,
				Nexus: []*models.BareNexus{
					{ID: rt.ID.String(), Name: rt.Name, Category: rt.Category},
				},
			})
		}
	}

	return tree, nil
}
