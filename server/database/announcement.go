package database

import (
	"fmt"

	"github.com/soorya-u/scholar-sync/models"
	surrealdb "github.com/surrealdb/surrealdb.go"
	surrealmodels "github.com/surrealdb/surrealdb.go/pkg/models"
)

func (db *DB) CreateAnnouncement(title, message, nexusId, userId string) (string, error) {
	params := models.DBAnnouncement{
		Title:   title,
		Message: message,
	}

	rawData, err := surrealdb.Create[[]models.DBAnnouncement](db.client, surrealmodels.Table("announcement"), params)
	if err != nil {
		return "", fmt.Errorf("unable to create announcement in DB: %v", err)
	}

	recordId := *(*rawData)[0].ID

	userRecordId := surrealmodels.RecordID{
		Table: "user",
		ID:    userId,
	}

	userRelation := surrealdb.Relationship{
		Relation: "has",
		In:       recordId,
		Out:      userRecordId,
	}

	if err = surrealdb.Relate(db.client, &userRelation); err != nil {
		return "", fmt.Errorf("unable to create relation between user and announcement: %v", err)
	}

	nexusRecordId := surrealmodels.RecordID{
		Table: "nexus",
		ID:    nexusId,
	}

	nexusRelation := surrealdb.Relationship{
		Relation: "sentBy",
		In:       nexusRecordId,
		Out:      recordId,
	}

	if err = surrealdb.Relate(db.client, &nexusRelation); err != nil {
		return "", fmt.Errorf("unable to create relation between nexus and announcement: %v", err)
	}

	return recordId.String(), nil

}

func (db *DB) GetAnnouncements(announcementIds []string) ([]*models.Announcement, error) {
	// TODO: Change Query Later to fetch Sent By User Later
	query := "SELECT * FROM $announcementIds;"
	params := map[string]interface{}{
		"announcementIds": announcementIds,
	}

	rawData, err := surrealdb.Query[[]models.DBAnnouncement](db.client, query, params)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch announcements: %v", err)
	}

	dbAnnouncements := (*rawData)[0].Result

	announcements := make([]*models.Announcement, len(dbAnnouncements))

	for _, a := range dbAnnouncements {
		announcements = append(announcements, &models.Announcement{
			ID:      a.ID.String(),
			Title:   a.Title,
			Message: a.Message,
			// TODO: Change this to Sent By User
			SentBy:    nil,
			Timestamp: a.Timestamp,
		})
	}

	return announcements, nil

}
