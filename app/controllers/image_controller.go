package controllers

import (
	"context"
	"fmt"
	"reflect"

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

var imageActions = map[string]bool{
	"DELETE": true,
}

type ImageActionPayload struct {
	Id     string `json:"id"`
	Action string `json:"action"`
}

func (c ImageActionPayload) isValid() bool {
	_, valid := imageActions[c.Action]
	return valid
}

func ImageActions(c *fiber.Ctx) error {
	logging.Log.Debug("Performing an Image action")
	logging.Log.Info(fmt.Sprintf("%v", imageActions))
	action := new(ImageActionPayload)

	if err := c.BodyParser(action); err != nil {
		logging.Log.Error(fmt.Sprintf("Error parsing request body: %v", err))
		return err
	}

	if !action.isValid() {
		logging.Log.Error(fmt.Sprintf("Invalid action requested. Got: '%v'. Expected %v", action.Action, reflect.ValueOf(imageActions).MapKeys()))
		return fiber.ErrBadRequest
	}

	dockerClient, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		logging.Log.Error("Error creating docker client")
		return fiber.ErrInternalServerError
	}
	defer dockerClient.Close()

	_, err = dockerClient.ImageRemove(context.Background(), action.Id, types.ImageRemoveOptions{})

	if err != nil {
		logging.Log.Error(fmt.Sprintf("Error deleting image %v", err))
		return fiber.ErrInternalServerError
	}
	return nil
}
