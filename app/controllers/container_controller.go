package controllers

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/gofiber/fiber/v2"
	log "github.com/sirupsen/logrus"
	"reflect"
)

func ContainerList(c *fiber.Ctx) error {
	log.Debug("Getting Container list")
	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Info("Error creating docker client")
		return fiber.ErrInternalServerError
	}
	defer dockerClient.Close()

	containers, err := dockerClient.ContainerList(context.Background(), types.ContainerListOptions{All: true})
	if err != nil {
		log.Info(fmt.Sprintf("Error fetching conatiner list: %v", err))
		return fiber.ErrInternalServerError
	}

	log.Debug(fmt.Sprintf("Got containers list: %v", containers))
	return c.JSON(containers)

}

var containerActions = map[string]bool{
	"START":   true,
	"RESTART": true,
	"STOP":    true,
	"DELETE":  true,
}

type ContainerActionPayload struct {
	Id     string `json:"id"`
	Action string `json:"action"`
}

func (c ContainerActionPayload) isValid() bool {
	_, valid := containerActions[c.Action]
	return valid
}

func ContainerActions(c *fiber.Ctx) error {
	log.Debug("Performing a container action")
	action := new(ContainerActionPayload)

	if err := c.BodyParser(action); err != nil {
		log.Error(fmt.Sprintf("Error parsing request body: %v", err))
		return err
	}

	if !action.isValid() {
		log.Error(fmt.Sprintf("Invalid action requested. Got: '%v'. Expected %v", action.Action, reflect.ValueOf(containerActions).MapKeys()))
		return fiber.ErrBadRequest
	}

	log.Debug(fmt.Sprintf("Action command received: %v container %v", action.Action, action.Id))
	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Info("Error creating docker client")
		return fiber.ErrInternalServerError
	}

	defer dockerClient.Close()

	switch action.Action {
	case "START":
		err = dockerClient.ContainerStart(context.Background(), action.Id, types.ContainerStartOptions{})
		if err != nil {
			log.Error(fmt.Sprintf("Error starting container %v", err))
			return fiber.ErrInternalServerError
		}
	case "STOP":
		err = dockerClient.ContainerStop(context.Background(), action.Id, container.StopOptions{})
		if err != nil {
			log.Error(fmt.Sprintf("Error stopping container %v", err))
			return fiber.ErrInternalServerError
		}
	case "RESTART":
		err = dockerClient.ContainerRestart(context.Background(), action.Id, container.StopOptions{})
		if err != nil {
			log.Error(fmt.Sprintf("Error restarting container %v", err))
			return fiber.ErrInternalServerError
		}
	case "DELETE":
		err = dockerClient.ContainerRemove(context.Background(), action.Id, types.ContainerRemoveOptions{})
		if err != nil {
			log.Error(fmt.Sprintf("Error removing container %v", err))
			return fiber.ErrInternalServerError
		}
	default:
		log.Error("Bad payload")
		return fiber.ErrBadRequest

	}

	return nil
}
