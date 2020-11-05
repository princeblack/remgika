import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleLogin } from "../../actions";
import black from "../../img/black-man.svg";
import children from "../../img/children.svg";
import event from "../../img/event.svg";
import group from "../../img/group.svg";

import "../../scss/welcom.scss";

class Welcome extends Component {
  render() {
    const isLoggedIn = this.props.isLoggedIn;

    return (
      <>
        {isLoggedIn ? (
          <Redirect to="/dashboard" />
        ) : (
          <div className="welcome">
            <header className="welcom-header">
              <div className="login-logout">
                <div className="login-button">
                  <Link to="/login">Sign in</Link>
                </div>
                <div className="logout-button">
                  <Link to="/signup">Sign Up</Link>
                </div>
              </div>
            </header>
            <div className="first-section">
              {black && (
                <>
                  <div className="remgika-texte">
                    <h1>Welcome to Remgika</h1>
                    <h3>social network for parents</h3>
                    <p>
                      Find or add a playground that is around you to help other
                      parents find playgrounds in their city or neighborhood.
                    </p>
                  </div>
                  <img src={black} alt="remgika"></img>
                </>
              )}
            </div>
            <div className="first-section reverse">
              {children && (
                <>
                  <img src={children} alt="remgika"></img>
                  <div className="remgika-texte">
                    <h2>Playgrounds</h2>
                    <p>
                      Find playgrounds around you with your geolocation or in
                      the search bar indicating the address of your location or
                      the city.
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="first-section">
              {event && (
                <>
                  <div className="remgika-texte">
                    <h2>Events</h2>
                    <p>
                    You don't know what to do with your children! find a activity near you to enjoy with them, or create your own  event.
                    </p>
                  </div>
                  <img src={event} alt="remgika"></img>
                </>
              )}
            </div>
            <div className="first-section reverse">
              {group && (
                <>
                  <img src={group} alt="remgika"></img>
                  <div className="remgika-texte">
                    <h2>Groups</h2>
                    <p>
                    Build your own network of parents by creating a Group or joining.
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="second-section">
              <div className="direct-home">
                <Link to="/playground">LET’S EXPLORE</Link>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { isLoggedIn: state.isLoggedIn };
};

export default connect(mapStateToProps, { handleLogin })(Welcome);
