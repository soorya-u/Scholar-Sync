package resolvers

import (
	"context"
	"fmt"

	"github.com/soorya-u/scholar-sync/generated"
	"github.com/soorya-u/scholar-sync/helpers"
	"github.com/soorya-u/scholar-sync/models"
)

func (r *queryResolver) GetUser(ctx context.Context, input models.LoginData) (string, error) {

	// Validation

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

	jwt, err := helpers.GenerateJWT(user.ID)

	if err != nil {
		return "", fmt.Errorf("%v", err)
	}

	return jwt, nil

}

func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
