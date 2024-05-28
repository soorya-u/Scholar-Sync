package helpers

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var clientUrl = os.Getenv("CLIENT_URL")

func EnableCors(s *gin.Engine) {
	config := cors.Config{
		AllowOrigins:     []string{clientUrl},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization-Bearer"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}

	s.Use(cors.New(config))
}
