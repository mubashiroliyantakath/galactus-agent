package templates

import (
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/network"
	"github.com/mubashiroliyantakath/galactus-agent/app/models"
)

var (
	Postgres = models.AppDefinition{
		Name:        "Postgres",
		Description: "Template to deploy postgres containers.",
		Config: container.Config{
			Hostname: "test",
			Env:      []string{"POSTGRES_USER=postgres", "POSTGRES_PASSWORD=postgres"},
		},
		HostConfig:       container.HostConfig{},
		NetworkingConfig: network.NetworkingConfig{},
	}
)
