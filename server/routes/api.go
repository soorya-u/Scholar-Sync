package routes

import (
	"time"

	"github.com/gin-gonic/gin"
)

func APIRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/test", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"data": time.Now(),
			})
		})
	}
}
