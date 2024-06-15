package resolvers

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/soorya-u/scholar-sync/generated"
	"github.com/soorya-u/scholar-sync/helpers"
	"github.com/soorya-u/scholar-sync/models"
	"github.com/soorya-u/scholar-sync/validators"
)

func (r *mutationResolver) SignUpUser(ctx context.Context, input models.SignUpData) (string, error) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok {
		return "", fmt.Errorf("unable to get cookie-access")
	} else if cookie.IsLoggedIn || cookie.UserId != "" {
		return cookie.UserId, fmt.Errorf("already logged in")
	}

	if isValid := validators.ValidateSignUpData(input); !isValid {
		return "", fmt.Errorf("invalid credentials")
	}
	user, err := r.Db.GetUserByEmail(input.Email)
	if err != nil {
		return "", fmt.Errorf("%v", err)
	} else if user != nil {
		return "", fmt.Errorf("user already exists")
	}

	hashedPassword, err := helpers.GetHashedPassword(input.Password)
	if err != nil {
		return "", fmt.Errorf("%v", err)
	}

	user, err = r.Db.AddNewUser(input.FullName, input.Email, hashedPassword)
	if err != nil {
		return "", fmt.Errorf("%v", err)
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

func (r *mutationResolver) SingleUpload(ctx context.Context, file graphql.Upload) (bool, error) {
	const uploadDir string = "static"

	workingDirectory, err := os.Getwd()
	if err != nil {
		return false, err
	}

	filePath := filepath.Join(workingDirectory, uploadDir, file.Filename)

	outFile, err := os.Create(filePath)
	if err != nil {
		return false, err
	}
	defer outFile.Close()

	if _, err := file.File.Seek(0, io.SeekStart); err != nil {
		return false, err
	}

	if _, err := io.Copy(outFile, file.File); err != nil {
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) CreateCore(ctx context.Context, input models.CoreData) (string, error) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok {
		return "", fmt.Errorf("unable to get cookie access")
	} else if !cookie.IsLoggedIn || cookie.UserId == "" {
		return "", fmt.Errorf("cookie not found")
	}

	coreId, err := r.Db.CreateCore(input.Name, cookie.UserId)
	if err != nil {
		return "", fmt.Errorf("%v", err)
	}

	return coreId, nil

}

func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
