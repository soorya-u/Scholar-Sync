package models

import (
	"time"
)

type User struct {
	ID          string      `json:"id"`
	FullName    string      `json:"fullName"`
	Email       string      `json:"email"`
	Password    string      `json:"password"`
	ProfileType ProfileType `json:"profileType"`
	CreatedAt   time.Time   `json:"createdAt"`
}
