import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut, authorise, allMyImage } from "../actions/index";
import { NavLink, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import remgika from "../img/remgika.png";
import avatar from "../img/avatar.png"

import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faUserInjured,
  faBaby,
  faUserAstronaut,
  faCarrot,
  faDemocrat,
} from "@fortawesome/free-solid-svg-icons";
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refrech: false,
    };
  }
  componentDidMount() {
      this.props.allMyImage();     
    if (this.props.isLoggedIn) {
      this.props.authorise();
      this.props.allMyImage();     
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      this.props.allMyImage();     
    }
  }
  toggleSidebar = (e) => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("slide-right");
  };
  handleLogOut = (e) => {
    this.toggleSidebar();
    this.props.history.push("/");
    this.props.logOut();
  };

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const active = { color: "#6bc774" };
    return (
      <>
        <div id="navigation" className="flex-row-space-between navColor">
          <div className="logo">
            <img src={remgika} alt="remgika"></img>
          </div>
          {isLoggedIn && (
            <div className="right flex-row-center">
              <div className="avatar" id="avatarHide">
                {this.props.proImage[0] !== undefined ? (
                  <img
                    src={this.props.proImage[0].imgCollection}
                    alt="profile"
                  ></img>
                ) : (
                  <img src={avatar} alt="profile"></img>
                )}
              </div>
            </div>
          )}
          <div className="left flex-row-center">
            <div id="burger">
              <FontAwesomeIcon icon={faBars} onClick={this.toggleSidebar} />
            </div>
          </div>
        </div>
        <div className="navColor sidebar">
          {isLoggedIn && (
            <>
              <div className="menu-item" onClick={this.toggleSidebar}>
                <NavLink activeStyle={active} to="/dashboard">
                  <FontAwesomeIcon icon={faCarrot} />
                  Dashboard
                </NavLink>
              </div>
            </>
          )}
          <div className="menu-item" onClick={this.toggleSidebar}>
            <NavLink activeStyle={active} to="/playground">
              <FontAwesomeIcon icon={faDemocrat} />
              Playground
            </NavLink>
          </div>
          <div className="menu-item" onClick={this.toggleSidebar}>
            <NavLink activeStyle={active} to="/events">
              <FontAwesomeIcon icon={faDemocrat} />
              Events
            </NavLink>
          </div>
          {isLoggedIn && (
            <div className="menu-item" onClick={this.handleLogOut}>
              <NavLink to="" activeStyle={active}>
                <FontAwesomeIcon icon={faBaby} />
                Log out
              </NavLink>
            </div>
          )}
          {!isLoggedIn && (
            <>
              <div className="menu-item" onClick={this.toggleSidebar}>
                <NavLink to="/login" activeStyle={active}>
                  <FontAwesomeIcon icon={faUserInjured} />
                  Login
                </NavLink>
              </div>
              <div className="menu-item" onClick={this.toggleSidebar}>
                <NavLink to="/signup" activeStyle={active}>
                  <FontAwesomeIcon icon={faUserAstronaut} />
                  Sign up
                </NavLink>
              </div>
            </>
          )}
          <div className="divider"></div>
          <div className="menu-item social">
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faLinkedin} />
            <FontAwesomeIcon icon={faDiscord} />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    info: state.info,
    proImage: state.proImage,
  };
};

export default connect(mapStateToProps, {
  authorise,
  allMyImage,
  logOut,
})(withRouter(Navigation));
