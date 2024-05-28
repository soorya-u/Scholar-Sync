package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/soorya-u/scholar-sync/helpers"
	"github.com/soorya-u/scholar-sync/middlewares"
	"github.com/soorya-u/scholar-sync/routes"
)

func main() {
	helpers.LoadEnv()

	port := helpers.GetPort()
	server := gin.Default()

	corsMiddleWare := middlewares.GetCorsMiddleware()
	server.Use(corsMiddleWare)

	routes.GraphQLRoutes(server)
	routes.APIRoutes(server)

	err := server.Run(port)

	if err != nil {
		log.Fatalf("Unable to Start Server: %v", err)
	}
}
