package resolvers

import (
	"context"

	"github.com/soorya-u/scholar-sync/generated"
	"github.com/soorya-u/scholar-sync/models"
)

func (r *announcementResolver) Nexus(ctx context.Context, obj *models.Announcement) (*models.Nexus, error) {
	return obj.Nexus, nil
}

func (r *announcementResolver) SentBy(ctx context.Context, obj *models.Announcement) (*models.Profile, error) {
	return obj.SentBy, nil
}

func (r *coreResolver) Creator(ctx context.Context, obj *models.Core) (*models.Profile, error) {
	return obj.Creator, nil
}

func (r *coreResolver) PseudoAdmins(ctx context.Context, obj *models.Core) ([]*models.Profile, error) {
	return obj.PseudoAdmins, nil
}

func (r *coreResolver) Nexus(ctx context.Context, obj *models.Core) ([]*models.Nexus, error) {
	return obj.Nexus, nil
}

func (r *fileResolver) SentBy(ctx context.Context, obj *models.File) (*models.Profile, error) {
	return obj.SentBy, nil
}

func (r *fileResolver) Nexus(ctx context.Context, obj *models.File) (*models.Nexus, error) {
	return obj.Nexus, nil
}

func (r *Resolver) Announcement() generated.AnnouncementResolver { return &announcementResolver{r} }

func (r *Resolver) Core() generated.CoreResolver { return &coreResolver{r} }

func (r *Resolver) File() generated.FileResolver { return &fileResolver{r} }

type announcementResolver struct{ *Resolver }
type coreResolver struct{ *Resolver }
type fileResolver struct{ *Resolver }
