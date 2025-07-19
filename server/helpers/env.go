package helpers

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	if os.Getenv("GIN_MODE") != "release" {
		err := godotenv.Load()

		if err != nil {
			fmt.Printf("Unable to Load Environment Variables: %v", err)
		}
	}
}
