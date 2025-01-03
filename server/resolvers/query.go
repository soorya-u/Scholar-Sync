package resolvers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/soorya-u/scholar-sync/generated"
	"github.com/soorya-u/scholar-sync/handlers"
	"github.com/soorya-u/scholar-sync/helpers"
	"github.com/soorya-u/scholar-sync/models"
)

func (r *queryResolver) Login(ctx context.Context, input models.LoginData) (string, error) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok {
		return "", fmt.Errorf("unable to get cookie-access")
	}

	token, err := handlers.LoginHandler(r.Db, input)
	if err != nil {
		return "", nil
	}

	if os.Getenv("GIN_MODE") == "release" {
		http.SetCookie(cookie.Writer, &http.Cookie{
			Name:     "authorization",
			Value:    token,
			Path:     "/",
			Expires:  time.Now().Add(time.Hour * 24 * 30),
			HttpOnly: true,
			Secure:   true,
			SameSite: http.SameSiteNoneMode,
		})

	} else {

		http.SetCookie(cookie.Writer, &http.Cookie{
			Name:     "authorization",
			Value:    token,
			Path:     "/",
			Expires:  time.Now().Add(time.Hour * 24 * 30),
			HttpOnly: true,
			Secure:   false,
		})
	}

	return token, nil
}

func (r *queryResolver) Logout(ctx context.Context) (bool, error) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok {
		return false, fmt.Errorf("unable to get cookie access")
	} else if !cookie.IsLoggedIn || cookie.UserId == "" {
		return false, fmt.Errorf("cookie not found")
	}

	if os.Getenv("GIN_MODE") == "release" {
		http.SetCookie(cookie.Writer, &http.Cookie{
			Name:     "authorization",
			Value:    "",
			Path:     "/",
			Expires:  time.Date(2003, time.May, 20, 7, 7, 7, 7, time.UTC),
			HttpOnly: true,
			Secure:   true,
			SameSite: http.SameSiteNoneMode,
		})

	} else {

		http.SetCookie(cookie.Writer, &http.Cookie{
			Name:     "authorization",
			Value:    "",
			Path:     "/",
			Expires:  time.Date(2003, time.May, 20, 7, 7, 7, 7, time.UTC),
			HttpOnly: true,
			Secure:   false,
		})
	}

	return true, nil
}

func (r *queryResolver) GetUser(ctx context.Context) (*models.Profile, error) {
	userId, err := helpers.GetUserIdFromCookie(&ctx)
	if err != nil {
		return nil, err
	}

	return handlers.GetUserHandler(r.Db, userId)
}

// TODO: rewrite Whole Function as previous was Exhaustive
func (r *queryResolver) GetUserData(ctx context.Context) ([]*models.Core, error) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok {
		return nil, fmt.Errorf("unable to get cookie access")
	} else if !cookie.IsLoggedIn || cookie.UserId == "" {
		return nil, fmt.Errorf("cookie not found")
	}

	// isAdmin, _ := r.Db.AdminCheck(cookie.UserId)

	// dbCores, err := r.Db.GetDBCores(cookie.UserId)
	// if err != nil {
	// 	return nil, err
	// }

	// coreData := make([]*models.Core, len(dbCores))

	// for cIdx, c := range dbCores {
	// 	coreData[cIdx] = &models.Core{
	// 		ID:        c.ID.String(),
	// 		Name:      c.Name,
	// 		ImageURL:  c.ImageURL,
	// 		CreatedAt: c.CreatedAt,
	// 		UpdatedAt: c.UpdatedAt,
	// 		Creator:   c.Creator,
	// 	}

	// 	dbNexus, err := r.Db.GetDBNexus(c.Nexus)
	// 	if err != nil {
	// 		return nil, err
	// 	}

	// 	nexusData := []*models.Nexus{}

	// 	for _, n := range dbNexus {

	// 		isNormalUserInNexus := false

	// 		for _, u := range n.Users {
	// 			if u.ID == cookie.UserId {
	// 				isNormalUserInNexus = true
	// 				break
	// 			}
	// 		}

	// 		if !isAdmin && cookie.UserId != n.Creator.ID && !isNormalUserInNexus {
	// 			continue
	// 		}

	// 		singleNexus := &models.Nexus{
	// 			ID:        n.ID,
	// 			Name:      n.Name,
	// 			Category:  n.Category,
	// 			Creator:   n.Creator,
	// 			Users:     n.Users,
	// 			CreatedAt: n.CreatedAt,
	// 			UpdatedAt: n.UpdatedAt,
	// 		}

	// 		dbFiles, err := r.Db.GetFiles(n.Files)
	// 		if err != nil {
	// 			return nil, err
	// 		}

	// 		fileData := make([]*models.File, len(dbFiles))

	// 		for fIdx, f := range dbFiles {
	// 			fileData[fIdx] = &models.File{
	// 				ID:          f.ID,
	// 				Title:       f.Title,
	// 				Description: f.Description,
	// 				FileURL:     f.FileURL,
	// 				FileName:    f.FileName,
	// 				SentBy:      f.SentBy,
	// 				TimeStamp:   f.TimeStamp,
	// 			}
	// 		}

	// 		singleNexus.Files = fileData

	// 		dbAnnouncements, err := r.Db.GetAnnouncements(n.Announcements)
	// 		if err != nil {
	// 			return nil, err
	// 		}

	// 		announcementsData := make([]*models.Announcement, len(dbAnnouncements))

	// 		for aIdx, a := range dbAnnouncements {
	// 			announcementsData[aIdx] = &models.Announcement{
	// 				ID:        a.ID,
	// 				Title:     a.Title,
	// 				Message:   a.Message,
	// 				SentBy:    a.SentBy,
	// 				TimeStamp: a.TimeStamp,
	// 			}
	// 		}

	// 		singleNexus.Announcements = announcementsData

	// 		nexusData = append(nexusData, singleNexus)

	// 	}

	// 	coreData[cIdx].Nexus = nexusData
	// }

	return nil, nil
}

func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
