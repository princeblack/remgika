import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  authorise,
  myPlayground,
  myEvents,
} from "../../actions/index";
import "../../scss/Dashboard.scss";
import Profile from "./Profile";
import Myplay from "./Myplay";
import "../../scss/myplay.scss";
import MyEvents from "./MyEvents";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      playToggle: true,
      evantToggle: true,
      deletePLAY: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handlePlayground = this.handlePlayground.bind(this);
    this.handleEvents = this.handleEvents.bind(this);
  }
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.myPlayground();
      this.props.myEvents();
      this.props.authorise();
    }
  }
  componentDidUpdate(prevProps) {
    // playground
    if (
      prevProps.personalPlayground.length !==
      this.props.personalPlayground.length
    ) {
      this.props.myPlayground();
    }
    if (prevProps.playIsDelete !== this.props.playIsDelete) {
      this.props.myPlayground();
    }
    if (prevProps.playIsUpdate !== this.props.playIsUpdate) {
      this.props.myPlayground();
    }
    // evenement
    if (prevProps.eventIsUpdate !== this.props.eventIsUpdate) {
      this.props.myEvents();
    }
    if (prevProps.eventIsDelete !== this.props.eventIsDelete) {
      this.props.myEvents();
    }
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.signUp(this.state);
  }
  handleProfile(e) {
    e.preventDefault();
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
    if (this.state.isToggleOn === true) {
      this.setState((state) => ({
        playToggle: true,
        evantToggle: true,
      }));
    }
  }
  handlePlayground(e) {
    e.preventDefault();
    this.setState((state) => ({
      playToggle: !state.playToggle,
    }));
    if (this.state.playToggle === true) {
      this.setState((state) => ({
        isToggleOn: true,
        evantToggle: true,
      }));
    }
  }
  handleEvents(e) {
    e.preventDefault();
    this.setState((state) => ({
      evantToggle: !state.evantToggle,
    }));
    if (this.state.evantToggle === true) {
      this.setState((state) => ({
        playToggle: true,
        isToggleOn: true,
      }));
    }
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const data = this.props.info;
    const isToggleOn = this.state.isToggleOn;
    const evantToggle = this.state.evantToggle;
    const playToggle = this.state.playToggle;

    let PlaygroundList;
    if (!this.props.personalPlayground.error) {
      PlaygroundList = this.props.personalPlayground.map((el, index) => {
        return <Myplay awat playIndex={index} data={el} key={index}></Myplay>;
      });
    }
    let EventsList;
    if (!this.props.personalEvents.error) {
      EventsList = this.props.personalEvents.map((el, index) => {
        return <MyEvents playIndex={index} data={el} key={index}></MyEvents>;
      });
    }
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
              <>
                {!isToggleOn && (
                  <>
                    <Profile />
                  </>
                )}
              </>
              <>
                {!evantToggle && (
                  <div className="all-my-events-play">{EventsList}</div>
                )}
              </>
              <>
                {!playToggle && (
                  <div className="all-my-events-play">{PlaygroundList}</div>
                )}
              </>
            </div>
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    info: state.info,
    personalPlayground: state.personalPlayground,
    personalEvents: state.personalEvents,
    proImage: state.proImage,
    sign: state.sign,
    playIsDelete: state.playIsDelete,
    playIsUpdate: state.playIsUpdate,
    eventIsUpdate: state.eventIsUpdate,
    eventIsDelete: state.eventIsDelete,
    valideImg: state.valideImg,
    ImageIsDelete: state.ImageIsDelete,
  };
};
export default connect(mapStateToProps, {
  authorise,
  myPlayground,
  myEvents,
})(Dashboard);
