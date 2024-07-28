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

	corsMiddleware := middlewares.GetCorsMiddleware()
	server.Use(corsMiddleware)

	routes.StaticRoutes(server)
	routes.APIRoutes(server)

	cookieMiddleware := middlewares.GetCookieMiddleware()
	server.Use(cookieMiddleware)

	routes.GraphQLRoutes(server)

	err := server.Run(port)

	if err != nil {
		log.Fatalf("Unable to Start Server: %v", err)
	}
}
