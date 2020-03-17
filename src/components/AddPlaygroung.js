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
      title: "",
      street:"",
      postalCode:"",
      city: "",
      description: ""
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
    const addPlay = this.props.addPlay
    console.log(addPlay);
    
    return (
      <>
        {isLoggedIn ? (
          <>
            <LoginHeader />
            <div className="addPlaygroung-form">
              <form onSubmit={this.handleSubmit} >
              <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="title"
                      type="text"
                      value={this.state.title}
                      placeholder="title or place name"
                      onChange={this.handleInputChange}
                      id="title"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="street"
                      type="text"
                      value={this.state.street}
                      placeholder=" Addresse"
                      onChange={this.handleInputChange}
                      id="street"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="postalCode"
                      type="text"
                      value={this.state.postalCode}
                      placeholder="Postal Code"
                      onChange={this.handleInputChange}
                      id="postalCode"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="city"
                      type="text"
                      value={this.state.city}
                      placeholder=" City"
                      onChange={this.handleInputChange}
                      id="city"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="description"
                      type="text"
                      placeholder="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      id="description"
                      required
                    />
                  </div>
                <input
                    className="addPlay-submit"
                    type="submit"
                    value="Submit"
                  />
              </form>
              { addPlay ? (
                <div className="addPlaygound-accept">
                  <p> the playground is add successfuly</p>
                </div>
              ):(
                this.shandleSubmit && 
                ( <div className="addPlaygound-erreur">
                    <p>Sorry somethings wint r</p>
                  </div>)
                
              )}
              <div>

              </div>
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
