import "./App.css";
import Homepage from "./Components/Homepage/Homepage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Card from "./Components/Cards/Card";
import Favourite from "./Components/Favourite/Favourite";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/home" component={Card} />
          <Route path="/favourite" component={Favourite} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
