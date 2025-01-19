// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package models

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/99designs/gqlgen/graphql"
)

type Announcement struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Message   string    `json:"message"`
	SentBy    *Profile  `json:"sentBy"`
	Timestamp time.Time `json:"timestamp"`
}

type AnnouncementData struct {
	Title   string `json:"title"`
	Message string `json:"message"`
	NexusID string `json:"nexusId"`
}

type BareNexus struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Category string `json:"category"`
}

type Core struct {
	ID        string             `json:"id"`
	Name      string             `json:"name"`
	ImageURL  string             `json:"imageUrl"`
	Members   []*ProfileWithRole `json:"members"`
	CreatedAt time.Time          `json:"createdAt"`
	UpdatedAt time.Time          `json:"updatedAt"`
}

type CoreData struct {
	Name     string `json:"name"`
	ImageURL string `json:"imageUrl"`
}

type CoreMember struct {
	UserID string `json:"userId"`
	CoreID string `json:"coreId"`
}

type File struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	FileName    string    `json:"fileName"`
	FileURL     string    `json:"fileUrl"`
	SentBy      *Profile  `json:"sentBy"`
	Timestamp   time.Time `json:"timestamp"`
}

type FileData struct {
	Title       string         `json:"title"`
	Description string         `json:"description"`
	Upload      graphql.Upload `json:"upload"`
	NexusID     string         `json:"nexusId"`
}

type GetNexusData struct {
	Core string `json:"core"`
}

type LoginData struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Mutation struct {
}

type Nexus struct {
	ID            string             `json:"id"`
	Name          string             `json:"name"`
	Category      string             `json:"category"`
	Members       []*ProfileWithRole `json:"members"`
	Files         []*File            `json:"files"`
	Announcements []*Announcement    `json:"announcements"`
	CreatedAt     time.Time          `json:"createdAt"`
	UpdatedAt     time.Time          `json:"updatedAt"`
}

type NexusData struct {
	Name     string `json:"name"`
	Category string `json:"category"`
	CoreID   string `json:"coreId"`
}

type NexusMember struct {
	UserID  string `json:"userId"`
	NexusID string `json:"nexusId"`
}

type Profile struct {
	ID        string    `json:"id"`
	FullName  string    `json:"fullName"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"createdAt"`
}

type ProfileWithRole struct {
	ID        string      `json:"id"`
	FullName  string      `json:"fullName"`
	Email     string      `json:"email"`
	CreatedAt time.Time   `json:"createdAt"`
	Role      ProfileType `json:"role"`
}

type Query struct {
}

type SignUpData struct {
	FullName string `json:"fullName"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Tree struct {
	ID       string       `json:"id"`
	Name     string       `json:"name"`
	ImageURL string       `json:"imageUrl"`
	Nexus    []*BareNexus `json:"nexus"`
}

type ProfileType string

const (
	ProfileTypeAdmin  ProfileType = "ADMIN"
	ProfileTypeNormal ProfileType = "NORMAL"
)

var AllProfileType = []ProfileType{
	ProfileTypeAdmin,
	ProfileTypeNormal,
}

func (e ProfileType) IsValid() bool {
	switch e {
	case ProfileTypeAdmin, ProfileTypeNormal:
		return true
	}
	return false
}

func (e ProfileType) String() string {
	return string(e)
}

func (e *ProfileType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = ProfileType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ProfileType", str)
	}
	return nil
}

func (e ProfileType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
