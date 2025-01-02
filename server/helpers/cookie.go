package helpers

import (
	"context"
	"fmt"

	"github.com/soorya-u/scholar-sync/models"
)

func GetUserIdFromCookie(ctx *context.Context) (string, error) {
	cookie, ok := (*ctx).Value("cookie-access").(models.CookieAccess)
	if !ok {
		return "", fmt.Errorf("unable to get cookie access")
	} else if !cookie.IsLoggedIn || cookie.UserId == "" {
		return "", fmt.Errorf("cookie not found")
	}

	return cookie.UserId, nil
}
