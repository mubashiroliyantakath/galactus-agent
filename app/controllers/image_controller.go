package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/mubashiroliyantakath/galactus-agent/app/models"
	log "github.com/sirupsen/logrus"
	"io"
	"os"
	"reflect"
)

func ImageList(c *fiber.Ctx) error {
	log.Debug("Fetching Image List")
	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Error("Error creating docker client")
		return fiber.ErrInternalServerError
	}
	defer dockerClient.Close()

	images, err := dockerClient.ImageList(context.Background(), types.ImageListOptions{All: true})
	if err != nil {
		return fiber.ErrInternalServerError
	}

	log.Debug(fmt.Sprintf("Image list fetched: %v", images))
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
	log.Debug("Performing an Image action")
	log.Info(fmt.Sprintf("%v", imageActions))
	action := new(ImageActionPayload)

	if err := c.BodyParser(action); err != nil {
		log.Error(fmt.Sprintf("Error parsing request body: %v", err))
		return err
	}

	if !action.isValid() {
		log.Error(fmt.Sprintf("Invalid action requested. Got: '%v'. Expected %v", action.Action, reflect.ValueOf(imageActions).MapKeys()))
		return fiber.ErrBadRequest
	}

	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Error("Error creating docker client")
		return fiber.ErrInternalServerError
	}
	defer dockerClient.Close()

	_, err = dockerClient.ImageRemove(context.Background(), action.Id, types.ImageRemoveOptions{})

	if err != nil {
		log.Error(fmt.Sprintf("Error deleting image %v", err))
		return fiber.ErrInternalServerError
	}
	return nil
}

type ImageSearchPayload struct {
	Image string `json:"image"`
}

func ImageSearch(c *fiber.Ctx) error {

	searchPayload := new(ImageSearchPayload)
	if err := c.BodyParser(searchPayload); err != nil {
		log.Error(fmt.Sprintf("Error parsing request body: %v", err))
		return fiber.ErrBadRequest
	}

	if searchPayload.Image == "" {
		return fiber.ErrBadRequest
	}
	log.Info("Searching for image ", fmt.Sprintf("%s", searchPayload.Image))
	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Error("Error creating docker client")
		return fiber.ErrInternalServerError
	}
	defer dockerClient.Close()

	images, err := dockerClient.ImageList(context.Background(), types.ImageListOptions{All: true})
	if err != nil {
		return fiber.ErrInternalServerError
	}

	for _, image := range images {
		for _, repoTag := range image.RepoTags {
			if repoTag == searchPayload.Image {
				log.Info("Image found ", fmt.Sprintf("%s", searchPayload.Image))
				return nil
			}
		}
	}
	log.Info("Image not found ", fmt.Sprintf("%s", searchPayload.Image))
	return fiber.ErrNotFound
}

func ImagePull(c *fiber.Ctx) error {

	image := new(ImageSearchPayload)
	if err := c.BodyParser(image); err != nil {
		log.Error(fmt.Sprintf("Error parsing request body: %v", err))
		return fiber.ErrBadRequest
	}

	if image.Image == "" {
		return fiber.ErrBadRequest
	}

	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Error("Error creating docker client")
		return fiber.ErrInternalServerError
	}
	defer dockerClient.Close()

	reader, err := dockerClient.ImagePull(context.Background(), image.Image, types.ImagePullOptions{})
	if err != nil {
		log.Error(err)
		return fiber.ErrNotFound
	}
	_, err = io.Copy(os.Stdout, reader)
	if err != nil {
		log.Error(err)
	}
	reader.Close()
	return nil
}

func ImagePullWS(c *websocket.Conn) {

	var (
		event *models.ImagePullEvent
	)

	log.Info("Image to pull Query: ", c.Query("image"))

	defer c.Close()
	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Error("Error creating docker client")
		if e := c.WriteJSON(models.ImagePullEvent{Error: "Encountered a server error."}); e != nil {
			log.Error("Writing Error: ", e)
		}
		return
	}
	defer dockerClient.Close()

	events, err := dockerClient.ImagePull(context.Background(), c.Query("image"), types.ImagePullOptions{})
	if err != nil {
		log.Error("Creating events error: ", err)
		if e := c.WriteJSON(models.ImagePullEvent{Error: err.Error()}); e != nil {
			log.Error("Writing Error: ", e)
		}
		return
	}
	defer events.Close()

	d := json.NewDecoder(events)

	for {
		if err = d.Decode(&event); err != nil {
			if err == io.EOF {

				break
			}
			panic(err)
		}

		if err = c.WriteJSON(event); err != nil {
			log.Error("Writing error: ", err)
			break
		}
	}
	return
}
