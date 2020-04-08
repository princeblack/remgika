import React from "react";
import "../scss/App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import SignUp from "./SignUp";
import NotFound from "./NotFound.js";
import Welcome from "./Welcome";
import { authorise, allMyImage } from "../actions";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import Playground from "./Playground";
import AddPlaygroung from "./AddPlaygroung";
class App extends React.Component {
  componentDidMount() {
    this.props.authorise();
    this.props.allMyImage();
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation ></Navigation>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/playground" component={Playground} />
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

export default connect(mapsStateToProps, { authorise, allMyImage })(App);
