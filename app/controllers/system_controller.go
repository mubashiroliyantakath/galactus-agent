package controllers

import (
	"context"
	"github.com/docker/docker/client"
	"github.com/gofiber/fiber/v2"
	log "github.com/sirupsen/logrus"
)

type SystemInfos struct {
	Containers int
	Images     int
}

func SystemInfo(c *fiber.Ctx) error {
	log.Info("Fetching system information")
	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Error("Error creating docker client")
		return fiber.ErrInternalServerError
	}
	defer dockerClient.Close()

	info, err := dockerClient.Info(context.Background())
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.JSON(info)
}
