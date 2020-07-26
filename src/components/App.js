import React from "react";
import "../scss/App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { authorise, allMyImage} from "../actions";
import { connect } from "react-redux";
import Dashboard from "./dashboard/Dashboard";
import Login from "./login-signUp/Login";
import SignUp from "./login-signUp/SignUp";
import NotFound from "./load-notfound/NotFound";
import Welcome from "./home-welcome/Welcome";
import Navigation from "./Navigation";
import Playground from "./playground/Playground";
import AddPlaygroung from "./playground/AddPlaygroung";
import MainEvents from "./events/MainEvents";
import AddEvents from "./events/AddEvents";
import Loading from "./Loading";
import MainGroup  from "./group/MainGroup";
import GroupPage  from "./group/GroupPage";
import  EventFormular  from "./group/EventFormular";


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
            <Route exact path="/groups" component={MainGroup} />
            <Route exact path="/group/:id" component={GroupPage} />
            <Route exact path="/group/:id/:name" component={GroupPage} />
            <Route exact path="/group/:id/:name/events" component={EventFormular} />

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
