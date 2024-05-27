package database

import (
	"log"

	"github.com/surrealdb/surrealdb.go"
)

const connectionString = "ws://127.0.0.1:8080/rpc"

type DB struct {
	client *surrealdb.DB
}

func Connect() *DB {
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

	return &DB{
		client: db,
	}
}
