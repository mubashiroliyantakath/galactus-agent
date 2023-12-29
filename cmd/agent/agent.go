package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/mubashiroliyantakath/galactus-agent/app/controllers"
	"github.com/mubashiroliyantakath/galactus-agent/internal/utils/config"
	log "github.com/sirupsen/logrus"
	"os"
	"os/signal"
)

var (
	app *fiber.App
)

func init() {
	log.SetFormatter(&log.TextFormatter{FullTimestamp: true})
	log.SetOutput(os.Stdout)
	logLevel, err := log.ParseLevel(os.Getenv("LOG_LEVEL"))
	if err != nil {
		logLevel = log.InfoLevel
	}
	log.SetLevel(logLevel)
	log.Info("Initializing Galactus Agent")
	log.Info("Reading Configs")
	err = config.NewConfig()
	if err != nil {
		log.Error(err.Error())
		os.Exit(1)
	}

}

func main() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	app = fiber.New()

	var allowedOrigins = config.AppConfig.AllowedOrigins
	if allowedOrigins == "" {
		allowedOrigins = "*"
	}

	app.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin",
		AllowOrigins:     allowedOrigins,
		AllowCredentials: true,
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))

	app.Get("/api/v1/containers/list", controllers.ContainerList)
	app.Get("/api/v1/images/list", controllers.ImageList)
	app.Post("/api/v1/images/action", controllers.ImageActions)
	app.Post("/api/v1/containers/action", controllers.ContainerActions)
	app.Post("/api/v1/containers/create", controllers.ContainerCreate)
	app.Get("/api/v1/apps/templates/list", controllers.PredefinedAppTemplates)
	app.Get("/api/v1/system/info", controllers.SystemInfo)
	app.Post("/api/v1/images/search", controllers.ImageSearch)
	go func() {
		<-c
		log.Info("Received Ctrl + C. Gracefully shutting down the server.")
		err := app.Shutdown()
		if err != nil {
			return
		}
		os.Exit(0)
	}()
	err := app.Listen(fmt.Sprintf(":%d", config.AppConfig.Http.Port))
	if err != nil {
		log.Error(err.Error())
		os.Exit(1)
	}

}
