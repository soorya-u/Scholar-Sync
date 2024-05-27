package routes

import "github.com/gin-gonic/gin"

func APIRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/test", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"data": "Gin is Working",
			})
		})
	}
}
