package helpers

import "os"

func GetPort() string {

	port := os.Getenv("PORT")
	if port == "" {
		port = "7000"
	}
	return port
}
