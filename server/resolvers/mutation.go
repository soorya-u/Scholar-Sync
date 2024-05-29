package resolvers

import (
	"context"
	"fmt"

	"github.com/soorya-u/scholar-sync/generated"
	"github.com/soorya-u/scholar-sync/helpers"
	"github.com/soorya-u/scholar-sync/models"
)

func (r *mutationResolver) CreateUser(ctx context.Context, input models.SignUpData) (string, error) {

	// validation

	isUserPresent, err := r.Db.IsUserRegisteredByEmail(input.Email)
	if err != nil {
		return "", fmt.Errorf("%v", err)
	} else if isUserPresent {
		return "", fmt.Errorf("user already exists")
	}

	hashedPassword, err := helpers.GetHashedPassword(input.Password)
	if err != nil {
		return "", fmt.Errorf("%v", err)
	}

	user, err := r.Db.AddNewUser(input.FullName, input.Email, hashedPassword)
	if err != nil {
		return "", fmt.Errorf("%v", err)
	}

	token, err := helpers.GenerateJWT(user.ID)
	if err != nil {
		return "", fmt.Errorf("%v", err)
	}

	return token, nil
}

func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
