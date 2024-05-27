package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID          uuid.UUID   `json:"id"`
	FullName    string      `json:"fullName"`
	Email       string      `json:"email"`
	Salt        string      `json:"salt"`
	Password    string      `json:"password"`
	ProfileType ProfileType `json:"profileType"`
	CreatedAt   time.Time   `json:"createdAt"`
}
