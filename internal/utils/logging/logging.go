package logging

import "go.uber.org/zap"

var (
	Log *zap.Logger
)

func NewLogger() {
	Log, _ = zap.NewProduction()
	defer Log.Sync()
}
