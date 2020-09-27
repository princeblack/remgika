import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleLogin } from "../../actions";
import woman from "../../img/black-woman.svg";
import LoginHeader from "./LoginHeader";
import { Link } from "react-router-dom";
import '../../scss/login.scss'
import { withRouter } from "react-router-dom";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
    this.props.handleLogin(this.state);
    this.setState({ email: '' });

  }
  render() {
    const isLoggedIn = this.props.isLoggedIn;    
    return (
      <>
        {isLoggedIn ? (
          <Redirect to="/dashboard" />
        ) : (
          <div id="login" className="page thirdColor">
            <LoginHeader />
            <div className="login-body">
              {woman && (
                <>
                               <div id="login-img">
                <img src={woman} alt="remgika"></img>
              </div>
              <div className="login-form">
                <h1>SIGN IN</h1>
                <form onSubmit={this.handleSubmit}>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="email"
                      type="text"
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
                  <Link to="/"> Forgot password?</Link>
                </form>
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </div>
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return { isLoggedIn: state.isLoggedIn, info: state.info };
};

export default connect(mapStateToProps, { handleLogin })(withRouter(Login));
