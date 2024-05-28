package helpers

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load()

	if err != nil {
		log.Fatalf("Unable to Load Environment Variables: %v", err)
	}
}
