package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()

	r.GET("/api", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"data": "gin working",
		})
	})

	r.Run(":3000")

}
