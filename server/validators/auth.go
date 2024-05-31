package validators

import (
	"regexp"

	"github.com/soorya-u/scholar-sync/models"
)

var nameRegex = regexp.MustCompile(`^[A-Za-z]+(?: [A-Za-z]+)?$`)
var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
var lowerCasePattern = regexp.MustCompile(`[a-z]`)
var upperCasePattern = regexp.MustCompile(`[A-Z]`)
var digitPattern = regexp.MustCompile(`\d`)
var specialCharPattern = regexp.MustCompile(`[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-]`)

func ValidateSignUpData(data models.SignUpData) bool {

	isNameValid := nameRegex.MatchString(data.FullName)
	isEmailValid := emailRegex.MatchString(data.Email)
	isPasswordValid := passwordValidator(data.Password)

	return isNameValid && isEmailValid && isPasswordValid
}

func ValidateLoginData(data models.LoginData) bool {

	isEmailValid := emailRegex.MatchString(data.Email)
	isPasswordValid := passwordValidator(data.Password)
	return isEmailValid && isPasswordValid
}

func passwordValidator(password string) bool {

	if len(password) < 8 {
		return false
	}

	return lowerCasePattern.MatchString(password) && upperCasePattern.MatchString(password) && digitPattern.MatchString(password) && specialCharPattern.MatchString(password)

}
