import React from 'react';
import '../scss/App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import NotFound from './NotFound.js';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/" component={Home} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
