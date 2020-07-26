package http

import (
	"encoding/json"
	"log"
	"net/http"
)

var tokens = tokenCollection{}

type authRequest struct {
	Name string `json:"name"`
}

type authResponse struct {
	Token string `json:"token"`
}

func authHandler(writer http.ResponseWriter, httpRequest *http.Request) {
	req := &authRequest{}
	if err := json.NewDecoder(httpRequest.Body).Decode(req); err != nil {
		log.Println("can't read body of request")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	token := tokens.createHash(req.Name)
	tokens.saveToken(token)

}
