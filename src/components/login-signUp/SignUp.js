import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp, handleLogin } from "../../actions";
import LoginHeader from "../login-signUp/LoginHeader";
import game from "../../img/game.png";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "Admin"
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.signUp(this.state);
  }
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const sign = this.props.sign;
    return (
      <>
        {isLoggedIn ? (
          <Redirect to="/dashboard" />
        ) : sign ? (
          <Redirect to="/dashboard" />
        ) : (
          <div id="sign-up">
            <LoginHeader />
            <div className="sign-body">
              <div id="sign-img">
                <img src={game} alt="remgika"></img>
              </div>
              <div className="sign-form">
                <h1>SIGN UP</h1>
                <form onSubmit={this.handleSubmit}>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="firstName"
                      type="text"
                      value={this.state.firstName}
                      placeholder="First Name"
                      onChange={this.handleInputChange}
                      id="firstName"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="lastName"
                      type="text"
                      value={this.state.lastName}
                      placeholder="Last Name"
                      onChange={this.handleInputChange}
                      id="lastName"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="email"
                      type="email"
                      value={this.state.email}
                      placeholder="Email"
                      onChange={this.handleInputChange}
                      id="email"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      id="password"
                      required
                    />
                  </div>
                  <input
                    className="login-submit"
                    type="submit"
                    value="Submit"
                  />
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    sign: state.sign,
    info: state.info
  };
};
export default connect(mapStateToProps, { handleLogin, signUp })(SignUp);
