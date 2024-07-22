package helpers

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	if os.Getenv("GIN_MODE") != "release" {
		err := godotenv.Load()

		if err != nil {
			log.Fatalf("Unable to Load Environment Variables: %v", err)
		}
	}
}
