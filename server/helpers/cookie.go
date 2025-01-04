package helpers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/soorya-u/scholar-sync/models"
)

func getCookieFromContext(ctx *context.Context) *models.CookieAccess {
	cookie, ok := (*ctx).Value("cookie-access").(models.CookieAccess)
	if !ok {
		return nil
	}
	return &cookie
}

func GetUserIdFromCookie(ctx *context.Context) (string, error) {
	cookie, ok := (*ctx).Value("cookie-access").(models.CookieAccess)
	if !ok {
		return "", fmt.Errorf("unable to get cookie access")
	} else if !cookie.IsLoggedIn || cookie.UserId == "" {
		return "", fmt.Errorf("cookie not found")
	}

	return cookie.UserId, nil
}

func SetValueToCookie(ctx *context.Context, token string) error {
	cookie := getCookieFromContext(ctx)
	if cookie == nil {
		return fmt.Errorf("unable to get cookie-access")
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

	return nil
}
