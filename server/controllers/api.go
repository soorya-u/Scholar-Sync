package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type LinkBody struct {
	Location string `json:"location"`
	JoinerId string `json:"joinerId"`
	UserId   string `json:"userId"`
}

func LinkHandler(ctx *gin.Context) {
	// var body LinkBody
	// if err := ctx.ShouldBindJSON(&body); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{
	// 		"error": err.Error(),
	// 	})
	// 	return
	// }

	// db := database.Connect()
	// defer db.Disconnect()

	// userId := fmt.Sprintf("user:%s", body.UserId)
	// userFullName, err := db.GetUserFullNameById(userId)
	// if err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{
	// 		"error": err.Error(),
	// 	})
	// 	return
	// }

	// name := ""
	// location := ""

	// if body.Location == "c" {
	// 	coreId := fmt.Sprintf("core:%s", body.JoinerId)
	// 	if name, err = db.GetCoreNameById(coreId); err != nil {
	// 		ctx.JSON(http.StatusInternalServerError, gin.H{
	// 			"error": err.Error(),
	// 		})
	// 		return
	// 	}
	// 	location = "Core"

	// } else if body.Location == "n" {
	// 	nexusId := fmt.Sprintf("nexus:%s", body.JoinerId)
	// 	if name, err = db.GetNexusNameById(nexusId); err != nil {
	// 		ctx.JSON(http.StatusInternalServerError, gin.H{
	// 			"error": err.Error(),
	// 		})
	// 		return
	// 	}
	// 	location = "Nexus"

	// } else {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{
	// 		"error": "invalid location",
	// 	})
	// 	return
	// }

	// ctx.JSON(http.StatusAccepted, gin.H{
	// 	"userFullName": userFullName,
	// 	"name":         name,
	// 	"location":     location,
	// })

	ctx.JSON(http.StatusAccepted, gin.H{})

}

func HealthHandler(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"wakeStatus": true,
	})
}
