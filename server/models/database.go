package models

import (
	"github.com/surrealdb/surrealdb.go/pkg/models"
)

type DBUser struct {
	ID            models.RecordID       `json:"id"`
	FullName      string                `json:"fullName"`
	Email         string                `json:"email"`
	EmailVerified bool                  `json:"emailVerified"`
	Password      string                `json:"password"`
	CreatedAt     models.CustomDateTime `json:"createdAt"`
}

type DBCore struct {
	ID        models.RecordID       `json:"id"`
	Name      string                `json:"name"`
	ImageURL  string                `json:"imageUrl"`
	CreatedAt models.CustomDateTime `json:"createdAt"`
	UpdatedAt models.CustomDateTime `json:"updatedAt"`
}

type DBNexus struct {
	ID        models.RecordID       `json:"id"`
	Name      string                `json:"name"`
	Category  string                `json:"category"`
	CreatedAt models.CustomDateTime `json:"createdAt"`
	UpdatedAt models.CustomDateTime `json:"updatedAt"`
}

type DBFile struct {
	ID          models.RecordID       `json:"id"`
	Title       string                `json:"title"`
	Description string                `json:"description"`
	FileName    string                `json:"fileName"`
	FileURL     string                `json:"fileUrl"`
	Timestamp   models.CustomDateTime `json:"timestamp"`
}

type DBAnnouncement struct {
	ID        models.RecordID       `json:"id"`
	Title     string                `json:"title"`
	Message   string                `json:"message"`
	Timestamp models.CustomDateTime `json:"timestamp"`
}

type DBCoreBareBone struct {
	ID   models.RecordID `json:"id"`
	Name string          `json:"name"`
}

type DBReverseTree struct {
	ID   models.RecordID `json:"id"`
	Name string          `json:"name"`
	Core DBCoreBareBone  `json:"core"`
}
