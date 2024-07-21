package controllers

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/soorya-u/scholar-sync/database"
)

func JoinUserToNexus(ctx *gin.Context) {
	userId, _ := ctx.GetQuery("u")
	nexusId, _ := ctx.GetQuery("j")

	userId = fmt.Sprintf("user:%s", userId)
	nexusId = fmt.Sprintf("nexus:%s", nexusId)

	db := database.Connect()

	if ok, err := db.AddUserToNexus(userId, nexusId, true); err != nil {
		ctx.JSON(500, gin.H{
			"error": err.Error(),
		})
	} else if ok {
		url := os.Getenv("CLIENT_URL")
		ctx.Redirect(201, url)
	}
}

func JoinPseudoUserToCore(ctx *gin.Context) {
	userId, _ := ctx.GetQuery("u")
	coreId, _ := ctx.GetQuery("j")

	userId = fmt.Sprintf("user:%s", userId)
	coreId = fmt.Sprintf("core:%s", coreId)

	db := database.Connect()

	if ok, err := db.AddPseudoAdminToCore(userId, coreId, true); err != nil {
		ctx.JSON(500, gin.H{
			"error": err.Error(),
		})
	} else if ok {
		url := os.Getenv("CLIENT_URL")
		ctx.Redirect(201, url)
	}
}
