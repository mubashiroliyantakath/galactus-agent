package controllers

import (
	"context"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gofiber/fiber/v2"
	"github.com/mubashiroliyantakath/galactus-agent/internal/utils/logging"
)

func ImageController(c *fiber.Ctx) error {
	dockerClient, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		logging.Log.Info("Error creating docker client")
		return fiber.ErrInternalServerError
	}
	images, err := dockerClient.ImageList(context.Background(), types.ImageListOptions{ContainerCount: true})
	if err != nil {
		return fiber.ErrInternalServerError
	}
	dockerClient.Close()
	return c.JSON(images)

}
