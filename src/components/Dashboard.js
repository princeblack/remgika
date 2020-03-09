import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authorise, handleLogin } from "../actions/index";
import "../scss/Dashboard.scss";
import Profile from "./Profile";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      playToggle: true,
      evantToggle: true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handlePlayground = this.handlePlayground.bind(this);
    this.handleEvents = this.handleEvents.bind(this);
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
  handleProfile(e) {
    e.preventDefault();
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
    if (this.state.isToggleOn === true) {
      this.setState(state => ({
        playToggle: true,
        evantToggle: true
      }));
    }
  }
  handlePlayground(e) {
    e.preventDefault();
    this.setState(state => ({
      playToggle: !state.playToggle
    }));
    if (this.state.playToggle === true) {
      this.setState(state => ({
        isToggleOn: true,
        evantToggle: true
      }));
    }
  }
  handleEvents(e) {
    e.preventDefault();
    this.setState(state => ({
      evantToggle: !state.evantToggle
    }));
    if (this.state.evantToggle === true) {
      this.setState(state => ({
        playToggle: true,
        isToggleOn: true
      }));
    }
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const data = this.props.info;
    const isToggleOn = this.state.isToggleOn;
    const evantToggle = this.state.evantToggle;
    const playToggle = this.state.playToggle
    return (
      <>
        {!isLoggedIn ? (
          <Redirect to="/login" />
        ) : (
          <>
            <div className="mainProfile">
              <p className="sayHallo">Welcome {data.firstName} 👋</p>
              <div className="profileMenu">
                <button id="userInfo" onClick={this.handleProfile}>
                  {this.state.isToggleOn ? "Profile" : "Profile "}
                </button>
                <button onClick={this.handlePlayground}>
                  {this.state.playToggle ? "Playground" : " Playground"}
                </button>
                <button onClick={this.handleEvents}>
                  {this.state.evantToggle ? "Events" : "Events "}
                </button>
              </div>
              <>{!isToggleOn && <Profile /> }</>
              <>{!evantToggle && <p>hallo</p>}</>
              <>{!playToggle && <p>mama</p>}</>

            </div>
          </>
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
export default connect(mapStateToProps, { authorise, handleLogin })(Dashboard);
