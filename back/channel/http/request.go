package http

type request struct {
	content  []byte
	username string
	time     int64
}

func newRequest(content []byte, username string, time int64) *request {
	return &request{content: content, username: username, time: time}
}
