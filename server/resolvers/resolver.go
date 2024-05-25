package resolvers

import "github.com/soorya-u/scholar-sync/database"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

var db = database.Connect()

type Resolver struct{}
