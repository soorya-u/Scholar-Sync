package controllers

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-gonic/gin"
	"github.com/soorya-u/scholar-sync/database"
	"github.com/soorya-u/scholar-sync/generated"
	"github.com/soorya-u/scholar-sync/resolvers"
)

func PlaygroundHandler() gin.HandlerFunc {
	hdlr := playground.Handler("GraphQL Playground", "/graphql")
	return func(ctx *gin.Context) {
		hdlr.ServeHTTP(ctx.Writer, ctx.Request)
	}
}

func GraphQLHandler() gin.HandlerFunc {
	resolver := resolvers.Resolver{
		Db: database.Connect(),
	}
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &resolver}))
	return func(ctx *gin.Context) {
		srv.ServeHTTP(ctx.Writer, ctx.Request)
	}
}
