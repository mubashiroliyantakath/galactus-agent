package templates

import (
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/network"
	"github.com/mubashiroliyantakath/galactus-agent/app/models"
)

var (
	RabbitMQ = models.AppDefinition{
		Name:        "RabbitMQ",
		Description: "Template to deploy RabbitMQ server.",
		Config: container.Config{
			Image: "rabbitmq:3.11.6-management-alpine",
			Env: []string{
				"RABBITMQ_DEFAULT_USER=guest",
				"RABBITMQ_DEFAULT_PASS=guest",
			},
		},
		HostConfig:       container.HostConfig{},
		NetworkingConfig: network.NetworkingConfig{},
	}
)
