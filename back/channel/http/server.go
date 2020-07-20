package http

import "github.com/gorilla/websocket"

var server *wsServer

func init() {
	server = new(wsServer)
}

type wsServer struct {
	connections []*wsConnection
}

func (s *wsServer) addConnection(connection *websocket.Conn, username string) {
	wsConn := newWsConnection(connection, username)
	s.connections = append(s.connections, wsConn)
	wsConn.handle()
}

func (s *wsServer) sendForEveryone(r *response, messageType int) {

	for _, c := range s.connections {
		_ = c.connection.WriteMessage(messageType, r.toBytes())
	}

}
