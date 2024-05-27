package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/soorya-u/scholar-sync/routes"
)

const defaultPort = "7000"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	server := gin.Default()

	routes.GraphQLRoutes(server)
	routes.APIRoutes(server)

	server.Run(":" + port)

}
