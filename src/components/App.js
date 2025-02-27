import React , {useEffect} from "react";
import "../scss/App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { authorise, OneUser} from "../actions";
import { connect } from "react-redux";
import Footer from "./home-welcome/Footer"
import Dashboard from "./dashboard/Dashboard";
import Login from "./login-signUp/Login";
import SignUp from "./login-signUp/SignUp";
import NotFound from "./load-notfound/NotFound";
import Welcome from "./home-welcome/Welcome";
import Navigation from "./Navigation";
import Playground from "./playground/Playground";
import PlayPage from "./playground/PlayPage";
import AddPlaygroung from "./playground/AddPlaygroung";
import MainEvents from "./events/MainEvents";
import AddEvents from "./events/AddEvents";
import Loading from "./Loading";
import MainGroup  from "./group/MainGroup";
import GroupPage  from "./group/GroupPage";
import  EventFormular  from "./group/EventFormular";
import  EventPage  from "./events/EventPage";
import  UserPage  from "./dashboard/UserPage";
import StoreContainer from './store/StoreContainer';
import NewArticle from './store/NewArticle';
import MyArticles from './store/MyArticles';
import Articles from './store/Articles';
import Messager from './message/Messager';
import Chat from './message/Chat';
import Socket from "./Sockect"
import socket from "./Sockect";
import Terms from "./login-signUp/Terms"
import  PasswordForgot  from "./login-signUp/PasswordForgot";
import  PasswordReset  from "./login-signUp/PasswordReset";
import Privacy from "./login-signUp/Privacy";
const App = (props)=> {

  useEffect(() => {
    props.authorise(); 
  }, [])
    const loading = props.loading
    return (
      <div className="App">
        {loading && <Loading></Loading>}
        <BrowserRouter>
          <Navigation></Navigation>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/login/:id" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signup/:id" component={SignUp} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/user/:id" component={UserPage} />
            <Route exact path="/playground" component={Playground} />
            <Route exact path="/playgroundPage/:id" component={PlayPage} />
            <Route exact path="/playgroundPage/:id/:name" component={PlayPage} />
            <Route exact path="/events" component={MainEvents} />
            <Route exact path="/events/:id" component={MainEvents} />
            <Route exact path="/eventPage/:id" component={EventPage} />
            <Route exact path="/eventPage/:id/:name" component={EventPage} />
            <Route exact path="/addEvents" component={AddEvents} />
            <Route exact path="/addplayground" component={AddPlaygroung} />
            <Route exact path="/groups" component={MainGroup} />
            <Route exact path="/group/:id" component={GroupPage} />
            <Route exact path="/group/:id/:name" component={GroupPage} />
            <Route exact path="/group/:id/:name/events" component={EventFormular} />
            <Route exact path="/store" component={StoreContainer}/>
            <Route exact path="/store/NewArticle" component={NewArticle}/>
            <Route exact path="/store/NewArticle/:id" component={NewArticle}/>
            <Route exact path="/MyArticles" component={MyArticles}/>
            <Route exact path="/MyArticles/:id" component={MyArticles}/>
            <Route exact path="/Articles/:id" component={Articles}/>
            <Route exact path="/Articles/:id/:name" component={Articles}/>
            <Route exact path="/Messager" component={Messager}/>
            <Route exact path="/password-forgot" component={PasswordForgot}/>
            <Route exact path="/account/reset-password/:id" component={PasswordReset}/>
            <Route exact path="/Chat/:id" component={Chat}/>
            <Route exact path="/Chat/:id/:name" component={Chat}/>

            <Route path="*" component={NotFound} />
          </Switch>
          <Footer></Footer>
        </BrowserRouter>
      </div>
    );
  
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

export default connect(mapsStateToProps, {authorise,  OneUser})(App)
;
