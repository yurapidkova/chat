package http

import "encoding/json"

type response struct {
	Content  []byte `json:"content"`
	Username string `json:"username"`
	Time     int64  `json:"time"`
}

func newResponse(content []byte, username string, time int64) *response {
	return &response{Content: content, Username: username, Time: time}
}

func (r *response) toBytes() []byte {
	respB, _ := json.Marshal(r)
	return respB
}
