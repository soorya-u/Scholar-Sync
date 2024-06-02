package models

import "net/http"

type CookieAccess struct {
	Writer     http.ResponseWriter
	IsLoggedIn bool
	UserId     string
}
