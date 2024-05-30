package helpers

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func GetHashedPassword(password string) (string, error) {
	hashedPasswordBytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.MinCost)

	if err != nil {
		return "", fmt.Errorf("unable to hash password: %v", err)
	}

	return string(hashedPasswordBytes), nil

}

func CompareHashedPassword(enteredPassword, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword(
		[]byte(hashedPassword), []byte(enteredPassword))

	return err == nil
}
