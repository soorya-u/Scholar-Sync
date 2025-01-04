package resolvers

import (
	"context"
	"fmt"

	"github.com/soorya-u/scholar-sync/generated"
	"github.com/soorya-u/scholar-sync/handlers"
	"github.com/soorya-u/scholar-sync/helpers"
	"github.com/soorya-u/scholar-sync/models"
)

func (r *mutationResolver) SignUp(ctx context.Context, input models.SignUpData) (string, error) {
	token, err := handlers.SignUpHandler(r.Db, input)
	if err != nil {
		return "", err
	}

	err = helpers.SetValueToCookie(&ctx, token)
	if err != nil {
		return "", err
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
	panic(fmt.Errorf("not implemented: AddMemberToCore - addMemberToCore"))
}

func (r *mutationResolver) RemoveMemberFromCore(ctx context.Context, input models.CoreMember) (bool, error) {
	userId, err := helpers.GetUserIdFromCookie(&ctx)
	if err != nil {
		return false, err
	}

	return handlers.RemoveMemberFromCoreHandler(r.Db, userId, input.UserID, input.CoreID)
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
	panic(fmt.Errorf("not implemented: AddMemberToNexus - addMemberToNexus"))
}

func (r *mutationResolver) RemoveMemberFromNexus(ctx context.Context, input models.NexusMember) (bool, error) {
	userId, err := helpers.GetUserIdFromCookie(&ctx)
	if err != nil {
		return false, err
	}

	return handlers.RemoveMemberFromNexusHandler(r.Db, userId, input.UserID, input.NexusID)
}

func (r *mutationResolver) LeaveNexus(ctx context.Context, nexusID string) (bool, error) {
	userId, err := helpers.GetUserIdFromCookie(&ctx)
	if err != nil {
		return false, err
	}

	return handlers.LeaveNexusHandler(r.Db, userId, nexusID)
}

func (r *mutationResolver) CreateFile(ctx context.Context, input models.FileData) (string, error) {
	userId, err := helpers.GetUserIdFromCookie(&ctx)
	if err != nil {
		return "", err
	}

	return handlers.CreateFileHandler(r.Db, input.Upload, input.Title, input.Description, input.Nexus, userId)
}

func (r *mutationResolver) CreateAnnouncement(ctx context.Context, input models.AnnouncementData) (string, error) {
	userId, err := helpers.GetUserIdFromCookie(&ctx)
	if err != nil {
		return "", err
	}
	return handlers.CreateAnnouncementHandler(r.Db, input.Title, input.Message, input.Nexus, userId)
}

func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//   - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//     it when you're done.
//   - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *mutationResolver) BuildDemoEnv(ctx context.Context) (bool, error) {
	// cookie, ok := ctx.Value("cookie-access").(models.CookieAccess)
	// if !ok {
	// 	return false, fmt.Errorf("unable to get cookie-access")
	// }

	// const coreName = "Demo Core"
	// const coreImage = "https://previews.123rf.com/images/vectorv/vectorv2011/vectorv201114752/159704026-black-television-report-icon-isolated-on-white-background-tv-news-yellow-square-button-vector.jpg"
	// const nexusName = "Welcome"
	// const category = "First"
	// const announcementTitle = "Welcome to the Demo Core"
	// const announcementDescription = "Hello! Welcome to the Demo Core. This is where you can test out the possibilities of Scholar Sync. You have been granted the PseudoAdmin Access within this Core and therefore, you can make any kind of changes within the Core. Remember, this is only the Demo Version and No Data of this Core will be stored!"

	// signUpData := models.SignUpData{
	// 	FullName: os.Getenv("ADMIN_NAME"),
	// 	Email:    os.Getenv("ADMIN_EMAIL"),
	// 	Password: os.Getenv("ADMIN_PASSWORD"),
	// }

	// if isValid := validators.ValidateSignUpData(signUpData); !isValid {
	// 	return false, fmt.Errorf("invalid credentials")
	// }

	// user, err := r.Db.GetUserByEmail(signUpData.Email)
	// if err != nil {
	// 	return false, err
	// }

	// if user == nil {
	// 	hashedPassword, err := helpers.GetHashedPassword(signUpData.Password)
	// 	if err != nil {
	// 		return false, err
	// 	}

	// 	user, err = r.Db.AddNewUser(signUpData.FullName, signUpData.Email, hashedPassword)
	// 	if err != nil {
	// 		return false, err
	// 	}
	// }

	// userId := user.ID

	// coreId, err := r.Db.CreateCore(coreName, coreImage, userId.String())
	// if err != nil {
	// 	return false, err
	// }

	// nexusId, err := r.Db.CreateNexus(nexusName, userId.String(), coreId, category)
	// if err != nil {
	// 	return false, err
	// }

	// _, err = r.Db.CreateAnnouncement(announcementTitle, announcementDescription, nexusId, userId.String())
	// if err != nil {
	// 	return false, err
	// }

	// // _, err = r.Db.PromoteToPseudoAdmin(cookie.UserId, nexusId)
	// // if err != nil {
	// // 	return false, err
	// // }

	// _, err = r.Db.AddUserToNexus(cookie.UserId, nexusId)
	// if err != nil {
	// 	return false, err
	// }

	return true, nil
}
