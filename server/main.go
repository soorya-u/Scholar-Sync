package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/soorya-u/scholar-sync/routes"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	server := gin.Default()

	api := server.Group("/api")
	{
		api.GET("/test", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"data": "Gin is Working",
			})
		})
	}

	graphql := server.Group("/graphql")
	{
		graphql.POST("", routes.GraphQLHandler())
		graphql.GET("/playground", routes.PlaygroundHandler())
	}

	server.Run(":" + port)

}
