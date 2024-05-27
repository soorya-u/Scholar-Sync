package database

// func (db *DB) CreateTodo(input models.NewTodo) (*models.Todo, error) {
// 	randNumber, err := rand.Int(rand.Reader, big.NewInt(100))
// 	if err != nil {
// 		return nil, fmt.Errorf("failed to generate random number: %v", err)
// 	}

// 	todo := &models.Todo{
// 		Text: input.Text,
// 		ID:   fmt.Sprintf("T%d", randNumber),
// 		User: &models.User{ID: input.UserID, Name: "user " + input.UserID},
// 	}
// 	data, err := db.client.Create("todo", todo)
// 	if err != nil {
// 		return nil, fmt.Errorf("failed to create todo: %v", err)
// 	}

// 	var createdTodos []models.Todo
// 	if err := surrealdb.Unmarshal(data, &createdTodos); err != nil {
// 		return nil, fmt.Errorf("failed to unmarshal created todo: %v", err)
// 	}

// 	if len(createdTodos) == 0 {
// 		return nil, fmt.Errorf("no todo created")
// 	}

// 	return &createdTodos[0], nil
// }

// func (db *DB) GetAllTodos() ([]*models.Todo, error) {
// 	var todos []*models.Todo

// 	data, err := db.client.Select("todo")
// 	if err != nil {
// 		return nil, fmt.Errorf("failed to fetch todos: %v", err)
// 	}

// 	if err := surrealdb.Unmarshal(data, &todos); err != nil {
// 		return nil, fmt.Errorf("failed to unmarshal fetched todos: %v", err)
// 	}
// 	return todos, nil
// }
