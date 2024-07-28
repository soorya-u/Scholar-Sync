package database

import (
	"log"
	"os"

	"github.com/surrealdb/surrealdb.go"
)

type DB struct {
	client *surrealdb.DB
}

func Connect() *DB {
	connectionString := os.Getenv("DATABASE_URL")

	db, err := surrealdb.New(connectionString)
	if err != nil {
		log.Fatalf("failed to connect to SurrealDB: %v", err)
	}

	if _, err := db.Signin(map[string]interface{}{
		"user": "root",
		"pass": "root",
	}); err != nil {
		log.Fatalf("failed to sign in to SurrealDB: %v", err)
	}

	if _, err := db.Use("test", "test"); err != nil {
		log.Fatalf("failed to switch to specified database: %v", err)
	}

	dataBytes, err := os.ReadFile("./database/init.surql")
	if err != nil {
		log.Fatalf("Unable to read the File: %v", err)
	}

	query := string(dataBytes)
	var params interface{}
	if _, err := db.Query(query, params); err != nil {
		log.Fatalf("Unable to initialize Database Schema: %v", err)
	}

	return &DB{
		client: db,
	}
}

func (db *DB) Disconnect() {
	db.client.Close()
}
