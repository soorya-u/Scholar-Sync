package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/soorya-u/scholar-sync/controllers"
)

func APIRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/join/core", controllers.JoinPseudoUserToCore)
		api.GET("/join/nexus", controllers.JoinUserToNexus)
	}
}
