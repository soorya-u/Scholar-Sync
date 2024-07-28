package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/soorya-u/scholar-sync/controllers"
)

func APIRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.POST("/link", controllers.LinkHandler)
	}
}
