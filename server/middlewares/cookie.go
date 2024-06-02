package middlewares

import (
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/soorya-u/scholar-sync/helpers"
	"github.com/soorya-u/scholar-sync/models"
)

func GetCookieMiddleware() gin.HandlerFunc {

	return func(ctx *gin.Context) {

		cookieAccess := models.CookieAccess{
			Writer:     ctx.Writer,
			IsLoggedIn: false,
			UserId:     "",
		}

		cookie, err := ctx.Request.Cookie("authorization")
		if err != nil {
			log.Printf("Error fetching cookie: %v", err)
			newCtx := context.WithValue(ctx.Request.Context(), "cookie-access", cookieAccess)
			ctx.Request = ctx.Request.WithContext(newCtx)
			ctx.Next()
			return
		}

		jwtToken := cookie.Value

		userId, err := helpers.DecodeJWT(jwtToken)
		if err != nil {
			log.Printf("unable to parse token: %v", err)
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization token"})
			return
		}

		cookieAccess.IsLoggedIn = true
		cookieAccess.UserId = userId
		newCtx := context.WithValue(ctx.Request.Context(), "cookie-access", cookieAccess)
		ctx.Request = ctx.Request.WithContext(newCtx)

		ctx.Next()
	}
}
