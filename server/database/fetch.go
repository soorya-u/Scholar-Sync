package database

func (db *DB) FindUserByEmail(email string) bool {
	res, _ := db.client.Query("SELECT * FROM user WHERE email = $email", map[string]string{
		"email": email,
	})

	return res == nil
}
