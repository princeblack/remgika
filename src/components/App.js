import React from "react";
import "../scss/App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Login from "./login-signUp/Login";
import SignUp from "./login-signUp/SignUp";
import NotFound from "./load-notfound/NotFound";
import Welcome from "./home-welcome/Welcome";
import { authorise, allMyImage } from "../actions";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import Playground from "./playground/Playground";
import AddPlaygroung from "./playground/AddPlaygroung";
import MainEvents from "./events/MainEvents";
import AddEvents from "./events/AddEvents";

class App extends React.Component {
  componentDidMount() {
    this.props.authorise();
    if (this.props.isLoggedIn) {
      this.props.allMyImage();
    }
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation></Navigation>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/playground" component={Playground} />
            <Route exact path="/events" component={MainEvents} />
            <Route exact path="/addEvents" component={AddEvents} />

            <Route exact path="/addplayground" component={AddPlaygroung} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
const mapsStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    info: state.info,
    proImage: state.proImage
  };
};

export default connect(mapsStateToProps, { authorise, allMyImage })(App)
;
