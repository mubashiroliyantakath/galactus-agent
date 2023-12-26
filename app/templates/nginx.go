package templates

import (
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/network"
	"github.com/mubashiroliyantakath/galactus-agent/app/models"
)

var (
	Nginx = models.AppDefinition{
		Name:             "Nginx",
		Description:      "Template to deploy nginx containers.",
		Config:           container.Config{},
		HostConfig:       container.HostConfig{},
		NetworkingConfig: network.NetworkingConfig{},
	}
)
