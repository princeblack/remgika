import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import remgika from "../img/remgika.png";
import {handleLogin} from "../actions"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
class Welcome extends Component {
  render() {
    const isLoggedIn= this.props.isLoggedIn;
    
    return (
      <>{isLoggedIn ? (
        <Redirect to="/dashboard" />
      ) : (<div className="welcome">
      <header className="welcom-header">
        <div className="login-logout">
          <div className="login-button">
            <Link to="/login">Sign in</Link>
          </div>
          <div className="logout-button">
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
        {/* <div className="menu">
          
        </div> */}
      </header>
      <div className="first-section">
        <img src={remgika} alt="remgika"></img>
        <div className="remgika-texte">
          <h2>purus sit amet volutpat</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. .
          </p>
        </div>
      </div>
      <div className="second-section">
        <div className="direct-home">
          <Link to="/home">LET’S EXPLORE</Link>
        </div>
      </div>
    </div>)}
      </>
    );
  }
}
const mapStateToProps = state => {
  return { isLoggedIn: state.isLoggedIn };
};

export default connect(mapStateToProps, { handleLogin })(Welcome);  