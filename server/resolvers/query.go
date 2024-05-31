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

	cookie, ok := helpers.ForContext(ctx)
	if !ok {
		return "", fmt.Errorf("unable to get cookie access")
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
	})

	return token, nil
}

func (r *queryResolver) GetUser(ctx context.Context) (*models.Profile, error) {
	cookie, ok := helpers.ForContext(ctx)
	if !ok {
		return nil, fmt.Errorf("unable to get cookie access")
	} else if !cookie.IsLoggedIn || cookie.UserId == "" {
		return nil, fmt.Errorf("cookie not found")
	}

	user, err := r.Db.GetUserByID(cookie.UserId)
	if err != nil {
		return nil, fmt.Errorf("%v", err)
	}

	return user, nil

}

func (r *queryResolver) GetCore(ctx context.Context) (*models.Core, error) {
	panic(fmt.Errorf("not implemented: GetCore - getCore"))
}

func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
