package handlers

import (
	"fmt"
	"io"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/soorya-u/scholar-sync/database"
)

func CreateFileHandler(db *database.DB, upload graphql.Upload, title, description, nexusId, userId string) (string, error) {
	if isAdmin, err := db.IsAdmin(userId, nexusId); err != nil {
		return "", err
	} else if !isAdmin {
		return "", fmt.Errorf("no privilages to upload file")
	}

	const staticDir = "static"

	splitter := strings.Split(upload.Filename, ".")
	fileExtention := splitter[len(splitter)-1]
	fileTitle := strings.Join(strings.Split(strings.ToLower(title), " "), "-")
	nexusIdDir := strings.Replace(nexusId, ":", "_", -1)
	userIdDir := strings.Replace(userId, ":", "_", -1)

	baseDir, err := os.Getwd()
	if err != nil {
		return "", fmt.Errorf("unable to get working dir: %v", err)
	}

	dirPath := filepath.Join(baseDir, staticDir, nexusIdDir, userIdDir)
	err = os.MkdirAll(dirPath, os.ModePerm)
	if err != nil {
		return "", fmt.Errorf("unable to create directory: %v", err)
	}
	fileName := fmt.Sprintf("%s-%d.%s", fileTitle, time.Now().UnixMilli(), fileExtention)

	filePath := filepath.Join(dirPath, fileName)

	outFile, err := os.Create(filePath)
	if err != nil {
		return "", fmt.Errorf("unable to create file: %v", err)
	}
	defer outFile.Close()

	if _, err := upload.File.Seek(0, io.SeekStart); err != nil {
		return "", err
	}

	if _, err := io.Copy(outFile, upload.File); err != nil {
		return "", err
	}

	url, err := url.JoinPath(nexusIdDir, userIdDir, fileName)
	if err != nil {
		return "", fmt.Errorf("unable to create URl path: %v", err)
	}

	fileID, err := db.CreateFile(title, description, upload.Filename, url, nexusId, userId)
	if err != nil {
		return "", err
	}

	return fileID, nil
}
