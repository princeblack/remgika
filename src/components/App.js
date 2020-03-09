import React from "react";
import "../scss/App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import NotFound from "./NotFound.js";
import Welcome from "./Welcome";
import { authorise } from "../actions";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import Playground from "./Playground";
class App extends React.Component {
  componentDidMount() {
    this.props.authorise();
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
            <Route exact path="/home" component={Home} />
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
    loading: state.loading,
    info: state.info
  };
};

export default connect(mapsStateToProps, { authorise })(App);
