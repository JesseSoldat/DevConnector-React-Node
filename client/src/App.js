import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";

import store from "./store";
import { setCurrentUser } from "./actions/auth";

import "./App.css";
// Components
import NavBar from "./components/NavBar";
// Pages
import NotFoundPage from "./pages/NotFound";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import CreateProfilePage from "./pages/CreateProfile";
import EditProfilePage from "./pages/EditProfile";
import AddExperiencePage from "./pages/AddExperience";
import AddEducationPage from "./pages/AddEducation";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <NavBar />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/dashboard" component={DashboardPage} />
              <Route
                exact
                path="/create-profile"
                component={CreateProfilePage}
              />
              <Route exact path="/edit-profile" component={EditProfilePage} />
              <Route
                exact
                path="/add-experience"
                component={AddExperiencePage}
              />
              <Route exact path="/add-education" component={AddEducationPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
