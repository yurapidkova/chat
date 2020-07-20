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
}

func wsUpgradeHandler(writer http.ResponseWriter, request *http.Request) {
	wsConnection, err := wsUpgrader.Upgrade(writer, request, nil)
	if err != nil {
		log.Println("error while upgrade")
		return
	}

	username := request.Header.Get("username")
	server.addConnection(wsConnection, username)
	log.Println(server)
	_ = wsConnection.WriteMessage(2, []byte("hi!"))
}
func hiHandler(writer http.ResponseWriter, _ *http.Request) {
	_, _ = writer.Write([]byte("Hi"))
}
