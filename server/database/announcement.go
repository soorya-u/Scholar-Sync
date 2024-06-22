package database

import (
	"fmt"
	"time"

	"github.com/surrealdb/surrealdb.go"
)

func (db *DB) CreateAnnouncement(title, message, nexusId, userId string) (string, error) {
	params := map[string]interface{}{
		"title":     title,
		"message":   message,
		"sentBy":    userId,
		"timeStamp": time.Now(),
	}

	rawData, err := db.client.Create("announcement", params)
	if err != nil {
		return "", fmt.Errorf("unable to create announcement in DB: %v", err)
	}

	var announcementId []struct {
		Id string
	}

	err = surrealdb.Unmarshal(rawData, &announcementId)
	if err != nil {
		return "", fmt.Errorf("unable to unmarshal announcements: %v", err)
	} else if len(announcementId) <= 0 {
		return "", fmt.Errorf("unable to find unmarshalled value of announcement")
	}

	res := announcementId[0].Id

	query := "UPDATE $nexusId SET announcements+=$announcementId;"
	params = map[string]interface{}{
		"nexusId":        nexusId,
		"announcementId": res,
	}

	_, err = db.client.Query(query, params)
	if err != nil {
		return "", fmt.Errorf("unable to Join: %v", err)
	}

	return res, nil

}
