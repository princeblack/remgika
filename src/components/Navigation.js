// import React,{useEffect} from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBars,
  faUserInjured,
  faBaby,
  faUserAstronaut,
  faCarrot,
  faDemocrat
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faDiscord
} from "@fortawesome/free-brands-svg-icons";
import { NavLink, withRouter } from "react-router-dom";
import { logOut, allMyImage } from "../actions";
import remgika from "../img/remgika.png";

import React, { Component } from "react";
class Navigation extends Component {
  componentDidMount() {
    // if (this.props.isLoggedIn) {
    this.props.allMyImage();
    // }
  }
  toggleSidebar = e => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("slide-right");
  };
  handleLogOut = e => {
    this.toggleSidebar();
    this.props.history.push("/");
    this.props.logOut();
  };

  render() {
    const status = this.props.isLoggedIn;
    const active = {
      color: "#6bc774"
    };
    // console.log(this.props.proImage[0]);
    console.log(this.props.isLoggedIn);

    let userImage;

    if (this.props.proImage.length > 0) {
      userImage = this.props.proImage.map((el, index) => {
        return <img src={el} key={index} alt="profile"></img>;
      });
    }
    console.log(userImage);
    
    return (
      <>
        <div id="navigation" className="flex-row-space-between navColor">
          <div className="logo">
            <img src={remgika} alt="remgika"></img>
          </div>
          {status && (
            <div className="right flex-row-center">
              <div className="avatar" id="avatarHide">
                {this.props.info.avatar !== undefined ? (
                  <img src={this.props.info.avatar} alt="avatar"></img>
                ) : (
                  <img src={this.props.picture} alt="avatar"></img>
                )}
              </div>
              <div className="name">
                <p>
                  {this.props.info.firstName + " " + this.props.info.lastName}
                </p>
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
          <div className="menu-item" onClick={this.toggleSidebar}>
            <NavLink activeStyle={active} to="/dashboard">
              <FontAwesomeIcon icon={faCarrot} />
              Dashboard
            </NavLink>
          </div>
          <div className="menu-item" onClick={this.toggleSidebar}>
            <NavLink activeStyle={active} to="/playground">
              <FontAwesomeIcon icon={faDemocrat} />
              Playground
            </NavLink>
          </div>
          {status && (
            <div className="menu-item" onClick={this.handleLogOut}>
              <NavLink to="" activeStyle={active}>
                <FontAwesomeIcon icon={faBaby} />
                Log out
              </NavLink>
            </div>
          )}
          {!status && (
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

const mapsStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    info: state.info,
    proImage: state.proImage
  };
};

export default connect(mapsStateToProps, { logOut, allMyImage })(
  withRouter(Navigation)
);
