package database

import (
	"fmt"
	"time"

	"github.com/soorya-u/scholar-sync/models"
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

func (db *DB) GetAnnouncements(announcementIds []string) ([]*models.Announcement, error) {
	query := "SELECT *, sentBy.* FROM $announcementIds;"
	params := map[string]interface{}{
		"announcementIds": announcementIds,
	}

	rawData, err := db.client.Query(query, params)
	if err != nil {
		return nil, fmt.Errorf("unable to fetch announcements: %v", err)
	}

	var parsedData []struct {
		Result []*models.Announcement `json:"result"`
		Status string                 `json:"status"`
		Time   string                 `json:"time"`
	}

	err = surrealdb.Unmarshal(rawData, &parsedData)
	if err != nil {
		return nil, fmt.Errorf("unable to unmarshal announcements: %v", err)
	}

	res := parsedData[0].Result

	if len(res) <= 0 {
		return nil, nil
	}

	return res, nil

}
