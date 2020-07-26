package http

import (
	"github.com/gorilla/websocket"
	"log"
)

type wsConnection struct {
	connection *websocket.Conn
	username   string
}

func (ws *wsConnection) handle() {
	go ws.readAndWrite()
}

func (ws *wsConnection) readAndWrite() {
	defer ws.connection.Close()

	for {

		messageType, p, err := ws.connection.ReadMessage()

		if err != nil {
			log.Println(ws.username, "Died")
			_ = ws.connection.Close()
			break
		}

		server.sendForEveryone(p, messageType)
	}
}

func newWsConnection(connection *websocket.Conn, username string) *wsConnection {
	return &wsConnection{
		connection: connection,
		username:   username,
	}
}
