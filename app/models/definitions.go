package models

import (
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/network"
)

type AppDefinition struct {
	Name             string                   `json:"name"`
	Description      string                   `json:"description,omitempty"`
	Config           container.Config         `json:"config"`
	HostConfig       container.HostConfig     `json:"hostConfig,omitempty"`
	NetworkingConfig network.NetworkingConfig `json:"networkingConfig,omitempty"`
}
