package middlewares

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func GetCorsMiddleware() gin.HandlerFunc {
	clientUrl := os.Getenv("CLIENT_URL")

	config := cors.Config{
		AllowOrigins:     []string{clientUrl},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization-Bearer"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}

	corsMiddleware := cors.New(config)
	return corsMiddleware

}
