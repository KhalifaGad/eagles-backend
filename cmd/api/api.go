package main

import (
	"log"
)

// nodemon --exec go run ./cmd/api/api.go --signal SIGTERM

func main() {
	log.Print("Starting the api...")
	server := newServer(8080)
	err := server.Start()
	if err != nil {
		log.Fatal(err)
	}
}
