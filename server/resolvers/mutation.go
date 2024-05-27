package resolvers

import (
	"context"
	"fmt"

	"github.com/soorya-u/scholar-sync/generated"
	"github.com/soorya-u/scholar-sync/models"
)

func (r *mutationResolver) CreateUser(ctx context.Context, input models.SignUpData) (string, error) {
	panic(fmt.Errorf("not implemented: CreateUser - createUser"))
}

func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
