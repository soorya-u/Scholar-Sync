package models

import (
	"time"

	"github.com/surrealdb/surrealdb.go/pkg/models"
)

type DBUser struct {
	ID            *models.RecordID `json:"id"`
	FullName      string           `json:"fullName"`
	Email         string           `json:"email"`
	EmailVerified bool             `json:"emailVerified"`
	Password      string           `json:"password"`
	CreatedAt     time.Time        `json:"createdAt"`
}

type DBCore struct {
	ID        *models.RecordID `json:"id"`
	Name      string           `json:"name"`
	ImageURL  string           `json:"imageUrl"`
	CreatedAt time.Time        `json:"createdAt"`
	UpdatedAt time.Time        `json:"updatedAt"`
}

type DBNexus struct {
	ID        *models.RecordID `json:"id"`
	Name      string           `json:"name"`
	Category  string           `json:"category"`
	CreatedAt time.Time        `json:"createdAt"`
	UpdatedAt time.Time        `json:"updatedAt"`
}

type DBFile struct {
	ID          *models.RecordID `json:"id"`
	Title       string           `json:"title"`
	Description string           `json:"description"`
	FileName    string           `json:"fileName"`
	FileURL     string           `json:"fileUrl"`
	Timestamp   time.Time        `json:"timestamp"`
}

type DBAnnouncement struct {
	ID        *models.RecordID `json:"id"`
	Title     string           `json:"title"`
	Message   string           `json:"message"`
	Timestamp time.Time        `json:"timestamp"`
}
