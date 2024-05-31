package helpers

import (
	"context"

	"github.com/soorya-u/scholar-sync/models"
)

func ForContext(ctx context.Context, name string) (*models.CookieAccess, bool) {

	ctxKey := models.ContextKey{Name: "cookie-access"}

	cookieAccess, ok := ctx.Value(ctxKey).(*models.CookieAccess)
	return cookieAccess, ok
}
