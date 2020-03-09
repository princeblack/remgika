import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authorise,handleLogin } from "../actions/index";
import "../scss/Dashboard.scss";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.isLoggedIn) this.props.authorise();
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
    console.log(this.state);
    
  }
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const data = this.props.info;
    return (
      <>
        {!isLoggedIn ? (
          <Redirect to="/login" />
        ) : (
          <div className="dashboard">
            <div className="profile">
              <div className="user">
                <div className="user-data">
                  <label htmlFor="email">First Name </label>
                  <input
                    name="firstName"
                    type="text"
                    value={data.firstName}
                    onChange={this.handleInputChange}
                    id="firstName"
                    required
                  ></input>
                </div>
                <div className="user-data">
                  <label htmlFor="email">Last Name </label>
                  <input
                    name="lastName"
                    type="text"
                    value={data.lastName}
                    onChange={this.handleInputChange}
                    id="lastName"
                    required
                  ></input>
                </div>
                <div className="user-data">
                  <label htmlFor="email">Email ID </label>
                  <input
                    name="email"
                    type="text"
                    value={data.email}
                    onChange={this.handleInputChange}
                    id="email"
                    required
                  ></input>
                </div>
                <div className="user-data">
                  <label htmlFor="email">Birthday </label>
                  <input
                    name="birthday"
                    type="text"
                    value={data.birthday}
                    onChange={this.handleInputChange}
                    id="birthday"
                    required
                  ></input>
                </div>
                <div className="user-data">
                  <label htmlFor="Address">Address </label>
                  <input
                    name="Address"
                    type="text"
                    value="briesestr 81"
                    onChange={this.handleInputChange}
                    id="Address"
                    required
                  ></input>
                </div>
                <div className="user-data">
                  <label htmlFor="code">Code Postal</label>
                  <input
                    name="CodePostal"
                    type="text"
                    value="12053"
                    onChange={this.handleInputChange}
                    id="CodePostal"
                    required
                  ></input>
                </div>
                <div className="user-data">
                  <label htmlFor="City">City </label>
                  <input
                    name="City"
                    type="text"
                    value="Berlin"
                    onChange={this.handleInputChange}
                    id="City"
                    required
                  ></input>
                </div>
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
    info: state.info
  };
};
export default connect(mapStateToProps, { authorise ,handleLogin})(Profile);
