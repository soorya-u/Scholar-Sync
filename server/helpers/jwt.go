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

func DecodeJWT(jwtString string) (string, error) {

	token, err := jwt.Parse(jwtString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		jwtSecret := os.Getenv("JWT_SECRET")
		return []byte(jwtSecret), nil
	})

	if err != nil {
		return "", fmt.Errorf("unable to parse: %v", err)
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {

		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			return "", fmt.Errorf("token has expired")
		}

		userId := claims["sub"].(string)

		return userId, nil
	} else {
		return "", fmt.Errorf("unable to claim jwt")
	}
}
