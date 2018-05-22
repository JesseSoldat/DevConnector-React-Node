import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

// Components
import NotFoundPage from "./pages/NotFound";
import LoginPage from "./pages/Login";
const LandingPage = () => <h1>Landing</h1>;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
