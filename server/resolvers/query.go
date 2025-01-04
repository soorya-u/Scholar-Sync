package resolvers

import (
	"context"

	"github.com/soorya-u/scholar-sync/generated"
	"github.com/soorya-u/scholar-sync/handlers"
	"github.com/soorya-u/scholar-sync/helpers"
	"github.com/soorya-u/scholar-sync/models"
)

func (r *queryResolver) Login(ctx context.Context, input models.LoginData) (string, error) {
	token, err := handlers.LoginHandler(r.Db, input)
	if err != nil {
		return "", nil
	}

	err = helpers.SetValueToCookie(&ctx, token)
	if err != nil {
		return "", err
	}

	return token, nil
}

func (r *queryResolver) Logout(ctx context.Context) (bool, error) {
	_, err := helpers.GetUserIdFromCookie(&ctx)
	if err != nil {
		return false, err
	}

	if err = helpers.SetValueToCookie(&ctx, ""); err != nil {
		return false, err
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

func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
