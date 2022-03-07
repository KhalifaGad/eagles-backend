import "./App.css";
import { Login, Home } from "./Pages";
import * as Routes from "./HOCs/Routes";
import { Switch } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Switch>
        <Routes.Public path="/login" exact component={Login} />
        <Routes.Private path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
