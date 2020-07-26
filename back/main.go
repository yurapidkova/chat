package main

import (
	"github.com/panytsch/chat/back/channel/http"
	"log"
)

func main() {
	log.Println("Huray start")
	http.RunServer()
}
