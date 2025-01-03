package resolvers

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/soorya-u/scholar-sync/generated"
	"github.com/soorya-u/scholar-sync/handlers"
	"github.com/soorya-u/scholar-sync/helpers"
	"github.com/soorya-u/scholar-sync/models"
	"github.com/soorya-u/scholar-sync/validators"
)

func (r *mutationResolver) SignUp(ctx context.Context, input models.SignUpData) (string, error) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok {
		return "", fmt.Errorf("unable to get cookie-access")
	}

	token, err := handlers.SignUpHandler(r.Db, input)
	if err != nil {
		return "", err
	}

	if os.Getenv("GIN_MODE") == "release" {
		http.SetCookie(cookie.Writer, &http.Cookie{
			Name:     "authorization",
			Value:    token,
			Path:     "/",
			Expires:  time.Now().Add(time.Hour * 24 * 30),
			HttpOnly: true,
			Secure:   true,
			SameSite: http.SameSiteNoneMode,
		})

	} else {

		http.SetCookie(cookie.Writer, &http.Cookie{
			Name:     "authorization",
			Value:    token,
			Path:     "/",
			Expires:  time.Now().Add(time.Hour * 24 * 30),
			HttpOnly: true,
			Secure:   false,
		})
	}

	return token, nil
}

func (r *mutationResolver) CreateCore(ctx context.Context, input models.CoreData) (string, error) {
	userId, err := helpers.GetUserIdFromCookie(&ctx)
	if err != nil {
		return "", nil
	}

	return handlers.CreateCoreHandler(r.Db, input, userId)

}

func (r *mutationResolver) DeleteCore(ctx context.Context, coreID string) (bool, error) {
	userId, err := helpers.GetUserIdFromCookie(&ctx)
	if err != nil {
		return false, err
	}

	return handlers.DeleteCoreHandler(r.Db, coreID, userId)
}

func (r *mutationResolver) AddMemberToCore(ctx context.Context, input models.CoreMember) (bool, error) {
	// How to Add Member?
	//   - Through Link Sharing
	//   - Through Email Invitation?

	// Procedure
	//   - Check for Admin
	//   - Send Invitation

	panic(fmt.Errorf("not implemented: AddMemberToCore - addMemberToCore"))
}

func (r *mutationResolver) RemoveMemberFromCore(ctx context.Context, input models.CoreMember) (bool, error) {
	// Procedure
	//   - Check for Admin
	//   - Remove User
	panic(fmt.Errorf("not implemented: AddMemberToCore - addMemberToCore"))
}

func (r *mutationResolver) LeaveCore(ctx context.Context, nexusID string) (bool, error) {
	userId, err := helpers.GetUserIdFromCookie(&ctx)
	if err != nil {
		return false, err
	}

	return handlers.LeaveCoreHandler(r.Db, nexusID, userId)
}

func (r *mutationResolver) CreateNexus(ctx context.Context, input models.NexusData) (string, error) {
	userId, err := helpers.GetUserIdFromCookie(&ctx)
	if err != nil {
		return "", err
	}

	return handlers.CreateNexusHandler(r.Db, input.Name, userId, input.Core, input.Category)
}

func (r *mutationResolver) DeleteNexus(ctx context.Context, nexusID string) (bool, error) {
	userId, err := helpers.GetUserIdFromCookie(&ctx)
	if err != nil {
		return false, err
	}

	return handlers.DeleteNexusHandler(r.Db, nexusID, userId)
}

func (r *mutationResolver) AddMemberToNexus(ctx context.Context, input models.NexusMember) (bool, error) {
	// How to Add Member?
	//   - Through Link Sharing
	//   - Through Email Invitation?

	// Procedure
	//   - Check for Admin
	//   - Remove User
	panic(fmt.Errorf("not implemented: AddMemberToNexus - addMemberToNexus"))
}

func (r *mutationResolver) RemoveMemberFromNexus(ctx context.Context, input models.NexusMember) (bool, error) {
	// Procedure
	//   - Check for Admin
	//   - Remove User
	panic(fmt.Errorf("not implemented: AddMemberToCore - addMemberToCore"))
}

func (r *mutationResolver) LeaveNexus(ctx context.Context, nexusID string) (bool, error) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok {
		return false, fmt.Errorf("unable to get cookie access")
	} else if !cookie.IsLoggedIn || cookie.UserId == "" {
		return false, fmt.Errorf("cookie not found")
	}

	if ok, err := r.Db.RemoveUserFromNexus(cookie.UserId, nexusID); err != nil {
		return false, err
	} else if !ok {
		return false, fmt.Errorf("unable to remove user")
	}

	return true, nil
}

func (r *mutationResolver) CreateFile(ctx context.Context, input models.FileData) (string, error) {
	const staticDir string = "static"

	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok {
		return "", fmt.Errorf("unable to get cookie access")
	} else if !cookie.IsLoggedIn || cookie.UserId == "" {
		return "", fmt.Errorf("cookie not found")
	}

	// if isAdmin, err := r.Db.AdminOrPseudoAdminCheck(cookie.UserId); err != nil {
	// 	return "", err
	// } else if !isAdmin {
	// 	return "", fmt.Errorf("not an admin or pseudoadmin")
	// }

	splitter := strings.Split(input.Upload.Filename, ".")
	fileExtention := splitter[len(splitter)-1]
	title := strings.Join(strings.Split(strings.ToLower(input.Title), " "), "-")
	nexusId := strings.Replace(input.Nexus, ":", "_", -1)
	userId := strings.Replace(cookie.UserId, ":", "_", -1)

	baseDir, err := os.Getwd()
	if err != nil {
		return "", err
	}

	dirPath := filepath.Join(baseDir, staticDir, nexusId, userId)
	err = os.MkdirAll(dirPath, os.ModePerm)
	if err != nil {
		return "", fmt.Errorf("unable to create directory: %v", err)
	}
	fileName := fmt.Sprintf("%s-%d.%s", title, time.Now().UnixMilli(), fileExtention)

	filePath := filepath.Join(dirPath, fileName)

	outFile, err := os.Create(filePath)
	if err != nil {
		return "", fmt.Errorf("unable to create file: %v", err)
	}
	defer outFile.Close()

	if _, err := input.Upload.File.Seek(0, io.SeekStart); err != nil {
		return "", err
	}

	if _, err := io.Copy(outFile, input.Upload.File); err != nil {
		return "", err
	}

	url, err := url.JoinPath(nexusId, userId, fileName)
	if err != nil {
		return "", fmt.Errorf("unable to create URl path: %v", err)
	}

	fileID, err := r.Db.CreateFile(input.Title, input.Description, input.Upload.Filename, url, input.Nexus, cookie.UserId)
	if err != nil {
		return "", err
	}

	return fileID, nil
}

func (r *mutationResolver) CreateAnnouncement(ctx context.Context, input models.AnnouncementData) (string, error) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok {
		return "", fmt.Errorf("unable to get cookie access")
	} else if !cookie.IsLoggedIn || cookie.UserId == "" {
		return "", fmt.Errorf("cookie not found")
	}

	// if isAdmin, err := r.Db.AdminOrPseudoAdminCheck(cookie.UserId); err != nil {
	// 	return "", err
	// } else if !isAdmin {
	// 	return "", fmt.Errorf("not an admin or pseudoadmin")
	// }

	announcementId, err := r.Db.CreateAnnouncement(input.Title, input.Message, input.Nexus, cookie.UserId)
	if err != nil {
		return "", err
	}

	return announcementId, nil
}

func (r *mutationResolver) BuildDemoEnv(ctx context.Context) (bool, error) {
	cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	if !ok {
		return false, fmt.Errorf("unable to get cookie-access")
	}

	const coreName = "Demo Core"
	const coreImage = "https://previews.123rf.com/images/vectorv/vectorv2011/vectorv201114752/159704026-black-television-report-icon-isolated-on-white-background-tv-news-yellow-square-button-vector.jpg"
	const nexusName = "Welcome"
	const category = "First"
	const announcementTitle = "Welcome to the Demo Core"
	const announcementDescription = "Hello! Welcome to the Demo Core. This is where you can test out the possibilities of Scholar Sync. You have been granted the PseudoAdmin Access within this Core and therefore, you can make any kind of changes within the Core. Remember, this is only the Demo Version and No Data of this Core will be stored!"

	signUpData := models.SignUpData{
		FullName: os.Getenv("ADMIN_NAME"),
		Email:    os.Getenv("ADMIN_EMAIL"),
		Password: os.Getenv("ADMIN_PASSWORD"),
	}

	if isValid := validators.ValidateSignUpData(signUpData); !isValid {
		return false, fmt.Errorf("invalid credentials")
	}

	user, err := r.Db.GetUserByEmail(signUpData.Email)
	if err != nil {
		return false, err
	}

	if user == nil {
		hashedPassword, err := helpers.GetHashedPassword(signUpData.Password)
		if err != nil {
			return false, err
		}

		user, err = r.Db.AddNewUser(signUpData.FullName, signUpData.Email, hashedPassword)
		if err != nil {
			return false, err
		}
	}

	userId := user.ID

	coreId, err := r.Db.CreateCore(coreName, coreImage, userId.String())
	if err != nil {
		return false, err
	}

	nexusId, err := r.Db.CreateNexus(nexusName, userId.String(), coreId, category)
	if err != nil {
		return false, err
	}

	_, err = r.Db.CreateAnnouncement(announcementTitle, announcementDescription, nexusId, userId.String())
	if err != nil {
		return false, err
	}

	// _, err = r.Db.PromoteToPseudoAdmin(cookie.UserId, nexusId)
	// if err != nil {
	// 	return false, err
	// }

	_, err = r.Db.AddUserToNexus(cookie.UserId, nexusId)
	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
