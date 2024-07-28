package middlewares

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/soorya-u/scholar-sync/database"
)

func StaticMiddleware(ctx *gin.Context) {
	path := ctx.Request.URL.Path
	path = strings.Replace(path, "/static/", "", -1)
	db := database.Connect()
	defer db.Disconnect()
	fileName, err := db.GetFilenameByPath(path)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
	}
	header := fmt.Sprintf("attachment; fileName=%s", fileName)
	ctx.Writer.Header().Set("Content-Disposition", header)
	ctx.Next()
}
