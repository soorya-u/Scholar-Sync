package resolvers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/soorya-u/scholar-sync/generated"
	"github.com/soorya-u/scholar-sync/helpers"
	"github.com/soorya-u/scholar-sync/models"
	"github.com/soorya-u/scholar-sync/validators"
)

func (r *queryResolver) LoginUser(ctx context.Context, input models.LoginData) (string, error) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok {
		return "", fmt.Errorf("unable to get cookie-access")
	} else if cookie.IsLoggedIn || cookie.UserId != "" {
		return cookie.UserId, fmt.Errorf("already logged in")
	}

	if isValid := validators.ValidateLoginData(input); !isValid {
		return "", fmt.Errorf("invalid credentials")
	}

	user, err := r.Db.GetUserByEmail(input.Email)
	if err != nil {
		return "", fmt.Errorf("%v", err)
	} else if user == nil {
		return "", fmt.Errorf("user not found")
	}

	isPasswordCorrect := helpers.CompareHashedPassword(input.Password, user.Password)

	if !isPasswordCorrect {
		return "", fmt.Errorf("incorrect credentials")
	}

	token, err := helpers.GenerateJWT(user.ID)

	if err != nil {
		return "", fmt.Errorf("%v", err)
	}

	http.SetCookie(cookie.Writer, &http.Cookie{
		Name:     "authorization",
		Value:    token,
		Path:     "/",
		Expires:  time.Now().Add(time.Hour * 24 * 30),
		HttpOnly: true,
		Secure:   os.Getenv("GIN_MODE") == "release",
		// SameSite: http.SameSiteNoneMode,
	})

	return token, nil
}

func (r *queryResolver) GetUser(ctx context.Context) (*models.Profile, error) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok {
		return nil, fmt.Errorf("unable to get cookie access")
	} else if !cookie.IsLoggedIn || cookie.UserId == "" {
		return nil, fmt.Errorf("cookie not found")
	}

	user, err := r.Db.GetProfileByID(cookie.UserId)
	if err != nil {
		return nil, fmt.Errorf("%v", err)
	}

	return user, nil
}

func (r *queryResolver) GetUserData(ctx context.Context) ([]*models.Core, error) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok {
		return nil, fmt.Errorf("unable to get cookie access")
	} else if !cookie.IsLoggedIn || cookie.UserId == "" {
		return nil, fmt.Errorf("cookie not found")
	}

	dbCores, err := r.Db.GetDBCores(cookie.UserId)
	if err != nil {
		return nil, err
	}

	coreData := make([]*models.Core, len(dbCores))

	for cIdx, c := range dbCores {
		coreData[cIdx] = &models.Core{
			ID:        c.ID,
			Name:      c.Name,
			ImageURL:  c.ImageURL,
			CreatedAt: c.CreatedAt,
			UpdatedAt: c.UpdatedAt,
			Creator:   c.Creator,
		}

		dbNexus, err := r.Db.GetDBNexus(c.Nexus)
		if err != nil {
			return nil, err
		}

		nexusData := make([]*models.Nexus, len(dbNexus))

		for nIdx, n := range dbNexus {
			nexusData[nIdx] = &models.Nexus{
				ID:        n.ID,
				Name:      n.Name,
				Category:  n.Category,
				Creator:   n.Creator,
				Users:     n.Users,
				CreatedAt: n.CreatedAt,
				UpdatedAt: n.UpdatedAt,
			}

			dbFiles, err := r.Db.GetFiles(n.Files)
			if err != nil {
				return nil, err
			}

			fileData := make([]*models.File, len(dbFiles))

			for fIdx, f := range dbFiles {
				fileData[fIdx] = &models.File{
					ID:          f.ID,
					Title:       f.Title,
					Description: f.Description,
					FileURL:     f.FileURL,
					FileName:    f.FileName,
					SentBy:      f.SentBy,
					TimeStamp:   f.TimeStamp,
				}
			}

			nexusData[nIdx].Files = fileData

			dbAnnouncements, err := r.Db.GetAnnouncements(n.Announcements)
			if err != nil {
				return nil, err
			}

			announcementsData := make([]*models.Announcement, len(dbAnnouncements))

			for aIdx, a := range dbAnnouncements {
				announcementsData[aIdx] = &models.Announcement{
					ID:        a.ID,
					Title:     a.Title,
					Message:   a.Message,
					SentBy:    a.SentBy,
					TimeStamp: a.TimeStamp,
				}
			}

			nexusData[nIdx].Announcements = announcementsData

		}

		coreData[cIdx].Nexus = nexusData
	}

	return coreData, nil
}

func (r *queryResolver) LogOut(ctx context.Context) (bool, error) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok {
		return false, fmt.Errorf("unable to get cookie access")
	} else if !cookie.IsLoggedIn || cookie.UserId == "" {
		return false, fmt.Errorf("cookie not found")
	}

	http.SetCookie(cookie.Writer, &http.Cookie{
		Name:     "authorization",
		Value:    "",
		Path:     "/",
		Expires:  time.Date(2003, time.May, 20, 7, 7, 7, 7, time.UTC),
		HttpOnly: true,
		Secure:   os.Getenv("GIN_MODE") == "release",
		// SameSite: http.SameSiteNoneMode,
	})

	return true, nil
}

func (r *queryResolver) IsUserLoggedIn(ctx context.Context) (bool, error) {
	if cookie, ok := ctx.Value("cookie-access").(models.CookieAccess); !ok {
		return false, fmt.Errorf("unable to get cookie access")
	} else {
		return cookie.IsLoggedIn && cookie.UserId != "", nil
	}
}

func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
