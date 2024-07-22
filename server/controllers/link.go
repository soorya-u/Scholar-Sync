package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/soorya-u/scholar-sync/database"
	"github.com/soorya-u/scholar-sync/models"
)

func JoinUserToNexus(ctx *gin.Context) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok || !cookie.IsLoggedIn || cookie.UserId == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "cookie not found or no user",
		})
	}

	userId := cookie.UserId
	nexusId, ok := ctx.GetQuery("j")

	if !ok || nexusId == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "invalid params",
		})
	}

	nexusId = fmt.Sprintf("nexus:%s", nexusId)

	db := database.Connect()

	if ok, err := db.AddUserToNexus(userId, nexusId, true); err != nil {
		ctx.JSON(500, gin.H{
			"error": err.Error(),
		})
	} else if ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"status": "OK",
		})
	}
}

func JoinPseudoUserToCore(ctx *gin.Context) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok || !cookie.IsLoggedIn || cookie.UserId == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "cookie not found or no user",
		})
	}

	userId := cookie.UserId
	coreId, ok := ctx.GetQuery("j")

	if !ok || coreId == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "invalid params",
		})
	}

	coreId = fmt.Sprintf("core:%s", coreId)

	db := database.Connect()

	if ok, err := db.AddPseudoAdminToCore(userId, coreId, true); err != nil {
		ctx.JSON(500, gin.H{
			"error": err.Error(),
		})
	} else if ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"status": "OK",
		})
	}
}
