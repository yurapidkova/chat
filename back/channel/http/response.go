package http

import "encoding/json"

type response struct {
	content  []byte
	username string
	time     int64
}

type jsonResponse struct {
	Content  string
	Username string
	Time     int64
}

func newResponse(content []byte, username string, time int64) *response {
	return &response{content: content, username: username, time: time}
}

func (r *response) toBytes() []byte {
	jr := jsonResponse{Content: string(r.content), Username: r.username, Time: r.time}
	respB, _ := json.Marshal(jr)
	return respB
}
