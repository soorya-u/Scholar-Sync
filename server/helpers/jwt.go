package helpers

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(userId string) (string, error) {
	jwtSecret := os.Getenv("JWT_SECRET")

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": userId,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	jwtString, err := token.SignedString([]byte(jwtSecret))

	if err != nil {
		return "", fmt.Errorf("unable To generate JWT Token: %v", err)
	}

	return jwtString, err

}
