package resolvers

import (
	"context"
	"fmt"

	"github.com/soorya-u/scholar-sync/generated"
	"github.com/soorya-u/scholar-sync/models"
)

func (r *queryResolver) GetUser(ctx context.Context, input *models.LoginData) (*models.Profile, error) {
	panic(fmt.Errorf("not implemented: GetUser - getUser"))
}

func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
