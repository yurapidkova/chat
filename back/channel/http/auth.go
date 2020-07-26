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
	writer.Header().Set("Access-Control-Allow-Origin", "*")
	writer.Header().Set("Access-Control-Allow-Headers", "*")
	if httpRequest.Method == http.MethodOptions {
		return
	}
	req := &authRequest{}
	if err := json.NewDecoder(httpRequest.Body).Decode(req); err != nil {
		log.Println("can't read body of request")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	token := tokens.createHash(req.Name)
	if err := tokens.saveToken(token); err != nil {
		log.Println(err.Error())
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	res := authResponse{
		Token: token,
	}
	jsonned, _ := json.Marshal(res)
	writer.WriteHeader(http.StatusCreated)
	_, _ = writer.Write(jsonned)
}
