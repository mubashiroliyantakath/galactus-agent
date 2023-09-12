package models

type Http struct {
	Port int `mapstructure:"port,required"`
}
type Config struct {
	Http Http `mapstructure:"http"`
}
