package http

import "github.com/gorilla/websocket"

var server *wsServer

func init() {
	server = new(wsServer)
}

type wsServer struct {
	connections []*wsConnection
}

type wsConnection struct {
	connection *websocket.Conn
	username   string
}

func newWsConnection(connection *websocket.Conn, username string) *wsConnection {
	return &wsConnection{
		connection: connection,
		username:   username,
	}
}

func (s *wsServer) addConnection(connection *websocket.Conn, username string) {
	wsConn := newWsConnection(connection, username)
	s.connections = append(s.connections, wsConn)
}
