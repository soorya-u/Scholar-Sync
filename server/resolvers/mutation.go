package resolvers

import (
	"context"
	"fmt"

	"github.com/soorya-u/scholar-sync/generated"
	"github.com/soorya-u/scholar-sync/helpers"
	"github.com/soorya-u/scholar-sync/models"
)

func (r *mutationResolver) CreateUser(ctx context.Context, input models.SignUpData) (string, error) {

	// Check if User Already Exists

	// Hash the Password
	hashedPassword, err := helpers.GetHashedPassword(input.Password)

	if err != nil {
		return "", fmt.Errorf("%v", err)
	}

	res, err := r.Db.AddNewUser(input.FullName, input.Email, hashedPassword)

	if err != nil {
		return "", fmt.Errorf("%v", err)
	}

	// With User Model, Create a JWT Token
	fmt.Println(res)

	return "JWT", nil
}

func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
