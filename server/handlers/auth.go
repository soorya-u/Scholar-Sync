package handlers

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/database"
	"github.com/soorya-u/scholar-sync/helpers"
	"github.com/soorya-u/scholar-sync/models"
	"github.com/soorya-u/scholar-sync/validators"
)

func LoginHandler(db *database.DB, payload models.LoginData) (string, error) {
	if isValid := validators.ValidateLoginData(payload); !isValid {
		return "", fmt.Errorf("invalid credentials")
	}

	user, err := db.GetUserByEmail(payload.Email)
	if err != nil {
		return "", err
	} else if user == nil {
		return "", fmt.Errorf("user not found")
	}

	isPasswordCorrect := helpers.CompareHashedPassword(payload.Password, user.Password)

	if !isPasswordCorrect {
		return "", fmt.Errorf("incorrect credentials")
	}

	token, err := helpers.GenerateJWT(user.ID.String())

	if err != nil {
		return "", err
	}

	return token, nil
}

func SignUpHandler(db *database.DB, payload models.SignUpData) (string, error) {
	if isValid := validators.ValidateSignUpData(payload); !isValid {
		return "", fmt.Errorf("invalid credentials")
	}
	user, err := db.GetUserByEmail(payload.Email)
	if err != nil {
		return "", err
	} else if user != nil {
		return "", fmt.Errorf("user already exists")
	}

	hashedPassword, err := helpers.GetHashedPassword(payload.Password)
	if err != nil {
		return "", err
	}

	user, err = db.CreateUser(payload.FullName, payload.Email, hashedPassword)
	if err != nil {
		return "", err
	}

	token, err := helpers.GenerateJWT(user.ID.String())
	if err != nil {
		return "", err
	}

	return token, nil
}
