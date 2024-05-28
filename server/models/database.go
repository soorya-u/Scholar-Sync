package models

import (
	"time"
)

type User struct {
	FullName    string      `json:"fullName"`
	Email       string      `json:"email"`
	Password    string      `json:"password"`
	ProfileType ProfileType `json:"profileType"`
	CreatedAt   time.Time   `json:"createdAt"`
}
