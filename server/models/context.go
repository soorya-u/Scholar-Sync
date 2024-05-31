package models

import "net/http"

type ContextKey struct {
	Name string
}

type CookieAccess struct {
	Writer     http.ResponseWriter
	IsLoggedIn bool
	UserId     string
}
