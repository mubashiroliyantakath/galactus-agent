package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gofiber/fiber/v2"
	"github.com/mubashiroliyantakath/galactus-agent/internal/utils/config"
	"github.com/mubashiroliyantakath/galactus-agent/internal/utils/logging"
)

var (
	app *fiber.App
)

func init() {
	logging.NewLogger()
	logging.Log.Info("Initializing Galactus Agent")
	logging.Log.Info("Reading Configs")
	err := config.NewConfig()
	if err != nil {
		logging.Log.Error(err.Error())
		os.Exit(1)
	}

}

func main() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	app = fiber.New()
	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		panic(err)
	}

	containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{})
	if err != nil {
		panic(err)
	}

	for _, container := range containers {
		fmt.Printf("%s %s\n", container.ID[:10], container.Image)
	}
	go func() {
		<-c
		logging.Log.Info("Received Ctrl + C. Gracefully shutting down the server.")
		app.Shutdown()
		os.Exit(0)
	}()
	err = app.Listen(fmt.Sprintf(":%d", config.AppConfig.Http.Port))
	if err != nil {
		logging.Log.Error(err.Error())
		os.Exit(1)
	}

}
