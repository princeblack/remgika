import React, { Component } from "react";
import { connect } from "react-redux";
import { handleLogin } from "../actions";
import { playground } from "../actions/index";

// import { Link, NavLink, withRouter } from "react-router-dom";
// import { Redirect } from "react-router-dom";
// import { Link, NavLink, withRouter } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import "../scss/Addplayground.scss";
class AddPlaygroung extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl:"",
      title: "",
      address:{
        street:"",
        code: "",
        city: ""
      }
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
    this.props.playground(this.state);   
  }
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    return (
      <>
        {isLoggedIn ? (
          <>
            <LoginHeader />
            <div className="addPlaygroung-form">
              <form onSubmit={this.handleSubmit} >
                <div className="input">
                  <label htmlFor="files"> Picture: </label>
                  <input
                    type="file"
                    id="files"
                    name="files"
                    accept="image/*"
                    multiple
                    required
                    value={this.state.imageUrl}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="files">Address: </label>
                  <input
                    className="input-transition"
                    name="street"
                    type="text"
                    // value={this.state.address.street}
                    placeholder="street"
                    onChange={this.handleInputChange}
                    id="street"
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
                      value={this.state.address.code}
                      placeholder="Code"
                      onChange={this.handleInputChange}
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
                      value={this.state.address.city}
                      placeholder="city"
                      onChange={this.handleInputChange}
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
    addplay : state.addPlay
  };
};
export default connect(mapStateToProps, { playground, handleLogin })(
  AddPlaygroung
);
