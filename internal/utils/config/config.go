package config

import (
	"strings"

	"github.com/mubashiroliyantakath/galactus-agent/app/models"
	"github.com/spf13/viper"
)

var (
	AppConfig *models.Config
)

func NewConfig() error {
	v := viper.New()
	v.AddConfigPath(".")
	v.SetConfigFile("config.yaml")
	v.SetConfigType("yaml")
	v.SetEnvPrefix("GAL")
	v.AutomaticEnv()
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	err := v.ReadInConfig()
	if err != nil {
		return err
	}
	err = v.Unmarshal(&AppConfig)
	if err != nil {
		return err
	}
	return nil
}
