package resolvers

import (
	"context"

	"github.com/soorya-u/scholar-sync/generated"
	"github.com/soorya-u/scholar-sync/models"
)

func (r *announcementResolver) SentBy(ctx context.Context, obj *models.Announcement) (*models.Profile, error) {
	return obj.SentBy, nil
}

func (r *coreResolver) Creator(ctx context.Context, obj *models.Core) (*models.Profile, error) {
	return obj.Creator, nil
}

func (r *coreResolver) Nexus(ctx context.Context, obj *models.Core) ([]*models.Nexus, error) {
	return obj.Nexus, nil
}

func (r *fileResolver) SentBy(ctx context.Context, obj *models.File) (*models.Profile, error) {
	return obj.SentBy, nil
}

func (r *nexusResolver) Creator(ctx context.Context, obj *models.Nexus) (*models.Profile, error) {
	return obj.Creator, nil
}

func (r *nexusResolver) Users(ctx context.Context, obj *models.Nexus) ([]*models.Profile, error) {
	return obj.Users, nil
}

func (r *nexusResolver) Files(ctx context.Context, obj *models.Nexus) ([]*models.File, error) {
	return obj.Files, nil
}

func (r *nexusResolver) Announcements(ctx context.Context, obj *models.Nexus) ([]*models.Announcement, error) {
	return obj.Announcements, nil
}

func (r *Resolver) Announcement() generated.AnnouncementResolver { return &announcementResolver{r} }

func (r *Resolver) Core() generated.CoreResolver { return &coreResolver{r} }

func (r *Resolver) File() generated.FileResolver { return &fileResolver{r} }

func (r *Resolver) Nexus() generated.NexusResolver { return &nexusResolver{r} }

type announcementResolver struct{ *Resolver }
type coreResolver struct{ *Resolver }
type fileResolver struct{ *Resolver }
type nexusResolver struct{ *Resolver }
