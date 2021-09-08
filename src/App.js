import "./App.css";
import Homepage from "./Components/Homepage/Homepage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Card from "./Components/Cards/Card";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/home" component={Card} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
