package http

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

var wsUpgrader websocket.Upgrader

func init() {
	wsUpgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}
}

func RunServer() {
	collectHandlers()
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func collectHandlers() {
	http.HandleFunc("/hi", hiHandler)
	http.HandleFunc("/api/v1/ws/chat/all", wsUpgradeHandler)
	http.HandleFunc("/api/v1/ws/auth", authHandler)
}

func wsUpgradeHandler(writer http.ResponseWriter, request *http.Request) {

	token, username := request.URL.Query().Get("token"), request.URL.Query().Get("username")

	if token == "" || username == "" {
		log.Println("Empty token || username ")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	tokens.removeToken(token)

	wsConnection, err := wsUpgrader.Upgrade(writer, request, nil)
	if err != nil {
		log.Println("error while upgrade")
		return
	}

	server.addConnection(wsConnection, username)

	//messageType, p, err := wsConnection.ReadMessage()
	//
	//_ = wsConnection.WriteMessage(messageType, p)
	//_ = wsConnection.Close()
}

func hiHandler(writer http.ResponseWriter, _ *http.Request) {
	_, _ = writer.Write([]byte("Hi"))
}
