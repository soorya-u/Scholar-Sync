package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/soorya-u/scholar-sync/controllers"
	"github.com/soorya-u/scholar-sync/middlewares"
)

func APIRoutes(r *gin.Engine) {
	api := r.Group("/api", middlewares.QueryMiddleware)
	{
		api.GET("/nexus/join", controllers.JoinUserToNexus)
		api.GET("/core/join", controllers.JoinPseudoUserToCore)
	}
}
