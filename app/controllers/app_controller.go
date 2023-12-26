package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mubashiroliyantakath/galactus-agent/app/templates"
)

func PredefinedAppTemplates(c *fiber.Ctx) error {
	return c.JSON(templates.AppTemplatesList)
}
