package routes

import (
	"net/http"

	handlers "github.com/KhalifaGad/EgyptEagles/cmd/api/routes/handlers"

	"github.com/gorilla/mux"
)

var Router = mux.NewRouter()

func init() {
	Router.HandleFunc("/health", handlers.HealthCheck)
}

func Append(baseMux *http.ServeMux) {
	baseMux.Handle("/", Router)
}
