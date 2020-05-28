import React from "react";
import "../scss/App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Login from "./login-signUp/Login";
import SignUp from "./login-signUp/SignUp";
import NotFound from "./load-notfound/NotFound";
import Welcome from "./home-welcome/Welcome";
import { authorise, allMyImage,fetchComment } from "../actions";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import Playground from "./playground/Playground";
import AddPlaygroung from "./playground/AddPlaygroung";
import MainEvents from "./events/MainEvents";
import AddEvents from "./events/AddEvents";
import Loading from "./Loading";

class App extends React.Component {
   componentDidMount() {
    this.props.authorise();    
    if (this.props.isLoggedIn) {
      this.props.allMyImage();
      this.props.authorise();    
      // this.props.fetchComment()
    }
  }   
  render() {
    const loading = this.props.loading
    return (
      <div className="App">
        {loading && <Loading></Loading>}
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
    proImage: state.proImage,
    loading: state.loading,
    allComment: state.allComment,

  };
};

export default connect(mapsStateToProps, { authorise, allMyImage })(App)
;
