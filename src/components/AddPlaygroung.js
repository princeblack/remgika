import React, { Component } from "react";
import { connect } from "react-redux";
import { authorise, handleLogin } from "../actions/index";
import { Redirect } from "react-router-dom";
import { Link, NavLink, withRouter } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import "../scss/Addplayground.scss";
class AddPlaygroung extends Component {
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    return (
      <>
        {isLoggedIn ? (
          <>
            <LoginHeader />
            <div className="addPlaygroung-form">
              <form>
                <div className="input">
                  <label htmlFor="files"> Picture: </label>
                  <input
                    type="file"
                    id="files"
                    name="files"
                    accept="image/*"
                    multiple
                    required
                  />
                </div>
                <div className="input">
                  <label htmlFor="files">Address: </label>
                  <input
                    className="input-transition"
                    name="address"
                    type="text"
                    // value={this.state.email}
                    placeholder="Address"
                    // onChange={this.handleInputChange}
                    id="address"
                    required
                  />
                </div>
                <div className="codeAndCity">
                  <div className="input">
                    <label htmlFor="files">Code: </label>
                    <input
                      className="input-transition"
                      name="Code"
                      type="text"
                      // value={this.state.email}
                      placeholder="Code"
                      // onChange={this.handleInputChange}
                      id="code"
                      required
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="files">City: </label>
                    <input
                      className="input-transition"
                      name="City"
                      type="text"
                      // value={this.state.email}
                      placeholder="city"
                      // onChange={this.handleInputChange}
                      id="city"
                      required
                    />
                  </div>
                </div>
                <div className="Playgroung-description">
                  <label>Description</label>
                  <textarea
                    maxLength="200"
                    minLength="100"
                    required
                    placeholder="Some description about the place"
                    rows="5"
                    // cols="90%"
                   />
                </div>
                <input
                    className="addPlay-submit"
                    type="submit"
                    value="Submit"
                  />
              </form>
            </div>
          </>
        ) : (
          <div>
            <p>please you need to be loged to Add a playground</p>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    info: state.info
  };
};
export default connect(mapStateToProps, { authorise, handleLogin })(
  AddPlaygroung
);
