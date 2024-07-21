package middlewares

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func StaticMiddleware(ctx *gin.Context) {
	fmt.Println("StaticMiddleware called")
	ctx.Writer.Header().Set("Content-Disposition", "attachment; filename=strong.pdf")
	ctx.Next()
}
