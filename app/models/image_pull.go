package models

type ImagePullEvent struct {
	Id             string `json:"id"`
	Status         string `json:"status"`
	Error          string `json:"error"`
	Progress       string `json:"progress,omitempty"`
	ProgressDetail struct {
		Current int `json:"current,omitempty"`
		Total   int `json:"total,omitempty"`
	} `json:"progressDetail,omitempty"`
}
