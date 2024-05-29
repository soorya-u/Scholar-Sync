package models

import (
	"time"
)

type User struct {
	ID            string      `json:"id"`
	FullName      string      `json:"fullName"`
	Email         string      `json:"email"`
	EmailVerified bool        `json:"emailVerified"`
	Password      string      `json:"password"`
	UserType      ProfileType `json:"userType"`
	CreatedAt     time.Time   `json:"createdAt"`
}
