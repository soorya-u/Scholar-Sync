package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/soorya-u/scholar-sync/middlewares"
)

func StaticRoutes(r *gin.Engine) {
	static := r.Group("/static", middlewares.StaticMiddleware)
	{
		static.Static("/", "./static")
	}
}
