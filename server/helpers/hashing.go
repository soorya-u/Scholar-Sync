package helpers

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func GetHashedPassword(password string) (string, error) {
	passwordBytes := []byte(password)

	hashedPasswordBytes, err := bcrypt.GenerateFromPassword(passwordBytes, bcrypt.MinCost)

	if err != nil {
		return "", fmt.Errorf("unable to hash password: %v", err)
	}

	hashedPassword := string(hashedPasswordBytes)

	return hashedPassword, nil
}

func CompareHashedPassword(currentPassword, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword(
		[]byte(hashedPassword), []byte(currentPassword))

	return err == nil
}
