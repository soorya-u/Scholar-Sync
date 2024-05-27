package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/soorya-u/scholar-sync/controllers"
)

func GraphQLRoutes(r *gin.Engine) {
	graphql := r.Group("/graphql")
	{
		graphql.POST("", controllers.GraphQLHandler())
		graphql.GET("/playground", controllers.PlaygroundHandler())
	}
}
