package database

import (
	"log"
	"os"

	surrealdb "github.com/surrealdb/surrealdb.go"
)

type DB struct {
	client *surrealdb.DB
}

func Connect() *DB {
	connectionString := os.Getenv("SURREALDB_URL")

	db, err := surrealdb.New(connectionString)
	if err != nil {
		log.Fatalf("failed to connect to SurrealDB: %v", err)
	}

	auth := &surrealdb.Auth{
		Username: os.Getenv("SURREALDB_USER"),
		Password: os.Getenv("SURREALDB_PASSWORD"),
	}

	if _, err := db.SignIn(auth); err != nil {
		log.Fatalf("failed to sign in to SurrealDB: %v", err)
	}

	if err := db.Use(os.Getenv("SURREALDB_NAMESPACE"), os.Getenv("SURREALDB_DATABASE")); err != nil {
		log.Fatalf("failed to switch to specified database: %v", err)
	}

	dataBytes, err := os.ReadFile("./database/init.surql")
	if err != nil {
		log.Fatalf("Unable to read the File: %v", err)
	}

	query := []surrealdb.QueryStmt{
		{
			SQL: string(dataBytes),
		},
	}

	if err := surrealdb.QueryRaw(db, &query); err != nil {
		log.Fatalf("Unable to initialize Database Schema: %v", err)
	}

	return &DB{
		client: db,
	}
}

func (db *DB) Disconnect() {
	db.client.Close()
}
