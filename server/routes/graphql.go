package routes

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/soorya-u/scholar-sync/controllers"
)

func GraphQLRoutes(r *gin.Engine) {
	graphql := r.Group("/graphql")
	{
		graphql.POST("", controllers.GraphQLHandler())
		if os.Getenv("GIN_MODE") != "release" {
			graphql.GET("/playground", controllers.PlaygroundHandler())
		}
	}
}
