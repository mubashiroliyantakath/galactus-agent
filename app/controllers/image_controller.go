package controllers

import (
	"context"
	"fmt"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gofiber/fiber/v2"
	"github.com/mubashiroliyantakath/galactus-agent/internal/utils/logging"
)

func ImageList(c *fiber.Ctx) error {
	logging.Log.Debug("Fetching Image List")
	dockerClient, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		logging.Log.Error("Error creating docker client")
		return fiber.ErrInternalServerError
	}
	defer dockerClient.Close()

	images, err := dockerClient.ImageList(context.Background(), types.ImageListOptions{All: true})
	if err != nil {
		return fiber.ErrInternalServerError
	}

	logging.Log.Debug(fmt.Sprintf("Image list fetched: %v", images))
	return c.JSON(images)

}
