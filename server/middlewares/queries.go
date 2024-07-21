package middlewares

import (
	"github.com/gin-gonic/gin"
)

func QueryMiddleware(ctx *gin.Context) {
	_, ok := ctx.GetQuery("u")
	if !ok {
		ctx.JSON(400, gin.H{
			"error": "params not found",
		})
	}

	_, ok = ctx.GetQuery("j")
	if !ok {
		ctx.JSON(400, gin.H{
			"error": "params not found",
		})
	}
	ctx.Next()
}
