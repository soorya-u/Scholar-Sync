package helpers

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func EnableCors(s *gin.Engine) {
	config := cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Change for Prod
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization-Bearer"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}

	s.Use(cors.New(config))
}
