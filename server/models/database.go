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

type DBCore struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	ImageURL  string    `json:"imageUrl"`
	Creator   *Profile  `json:"creator"`
	Nexus     []string  `json:"nexus"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type DBNexus struct {
	ID            string     `json:"id"`
	Name          string     `json:"name"`
	Category      string     `json:"category"`
	Creator       *Profile   `json:"creator"`
	Users         []*Profile `json:"users"`
	Files         []string   `json:"files"`
	Announcements []string   `json:"announcements"`
	CreatedAt     time.Time  `json:"createdAt"`
	UpdatedAt     time.Time  `json:"updatedAt"`
}
