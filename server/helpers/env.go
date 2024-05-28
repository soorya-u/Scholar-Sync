package helpers

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	var err error
	if os.Getenv("GIN_MODE") == "release" {
		err = godotenv.Load()
	} else {
		err = godotenv.Load(".env.local")
	}

	if err != nil {
		log.Fatalf("Unable to Load env Variables: %v", err)
	}
}
