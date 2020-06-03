import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleLogin } from "../../actions";
import black from "../../img/black-man.svg";
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
                  <img src={black} alt="remgika"></img>
                  <div className="remgika-texte">
                    <h2>Welcome to Remgika</h2>
                    <p>
                      Find playground or add playground to help other parents
                      find playgrounds in your city.
                    </p>
                    <p>
                      You don't know what to do with your children! find an
                      activity near you to enjoy with them, or create your own
                      event.
                    </p>
                    <div className="soon">
                      <p className="title-soon">Coming soon</p>
                      <div>
                        <p>Group</p>
                        <p>Chat</p>
                        <p>Sharing</p>
                      </div>
                    </div>
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
