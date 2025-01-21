package models

import (
	"github.com/surrealdb/surrealdb.go/pkg/models"
)

type DbUser struct {
	ID            models.RecordID       `json:"id"`
	FullName      string                `json:"fullName"`
	Email         string                `json:"email"`
	EmailVerified bool                  `json:"emailVerified"`
	Password      string                `json:"password"`
	CreatedAt     models.CustomDateTime `json:"createdAt"`
}

type DbCore struct {
	ID        models.RecordID       `json:"id"`
	Name      string                `json:"name"`
	ImageURL  string                `json:"imageUrl"`
	CreatedAt models.CustomDateTime `json:"createdAt"`
	UpdatedAt models.CustomDateTime `json:"updatedAt"`
}

type DbNexus struct {
	ID        models.RecordID       `json:"id"`
	Name      string                `json:"name"`
	Category  string                `json:"category"`
	CreatedAt models.CustomDateTime `json:"createdAt"`
	UpdatedAt models.CustomDateTime `json:"updatedAt"`
}

type DbFile struct {
	ID          models.RecordID       `json:"id"`
	Title       string                `json:"title"`
	Description string                `json:"description"`
	FileName    string                `json:"fileName"`
	FileURL     string                `json:"fileUrl"`
	Timestamp   models.CustomDateTime `json:"timestamp"`
}

type DbAnnouncement struct {
	ID        models.RecordID       `json:"id"`
	Title     string                `json:"title"`
	Message   string                `json:"message"`
	Timestamp models.CustomDateTime `json:"timestamp"`
}

type dbCoreBareBone struct {
	ID       models.RecordID `json:"id"`
	Name     string          `json:"name"`
	ImageURL string          `json:"imageUrl"`
}

type DbReverseTree struct {
	ID       models.RecordID `json:"id"`
	Name     string          `json:"name"`
	Core     dbCoreBareBone  `json:"core"`
	Category string          `json:"category"`
}

type dbProfile struct {
	ID        models.RecordID       `json:"id"`
	FullName  string                `json:"fullName"`
	Email     string                `json:"email"`
	CreatedAt models.CustomDateTime `json:"createdAt"`
	Role      string                `json:"role"`
}

type DbCoreWithMembers struct {
	DbCore
	Members []dbProfile `json:"members"`
}

type dbSender struct {
	SentBy DbUser `json:"sentBy"`
}

type dbFilesWithSender struct {
	DbFile
	dbSender
}

type DbAnnouncementsWithSender struct {
	DbAnnouncement
	dbSender
}

type DbNexusWithDeps struct {
	DbNexus
	Announcements []DbAnnouncementsWithSender `json:"announcements"`
	Files         []dbFilesWithSender         `json:"files"`
	Members       []dbProfile                 `json:"members"`
}
