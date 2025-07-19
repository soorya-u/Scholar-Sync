package main

import (
	"fmt"
	"log"
	"os"

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

	fmt.Printf("Starting Gin Server at http://localhost%v\n", port)
	os.Stdout.Sync()

	if err := server.Run(port); err != nil {
		log.Fatalf("Unable to Start Server: %v", err)
	}
}
