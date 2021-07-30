package main

import (
	"errors"
	"net/http"
	"strconv"

	routes "github.com/KhalifaGad/EgyptEagles/cmd/api/routes"
)

type server struct {
	port string
	mux  *http.ServeMux
}

func newServer(port int) *server {
	serverPort := ":" + strconv.Itoa(port)
	mux := http.NewServeMux()
	routes.Append(mux)
	return &server{port: serverPort, mux: mux}
}

func (server *server) Start() error {
	if server.port == "" {
		return errors.New("server port not exists")
	}

	err := http.ListenAndServe(server.port, server.mux)
	if err != nil {
		return err
	}
	return nil
}
