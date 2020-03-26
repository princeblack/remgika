import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar from "../img/avatar.png";

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
import { logOut } from "../actions";
import remgika from "../img/remgika.png";

const Navigation = props => {
  const status = props.isLoggedIn;  
  const toggleSidebar = e => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("slide-right");
  };
  const handleLogOut = e => {
    toggleSidebar();
    props.history.push("/");
    props.logOut();
  };
  const active = {
    color: "#6bc774"
  };

  return (
    <>
      <div id="navigation" className="flex-row-space-between navColor">
        <div className="logo">
          <img src={remgika} alt="remgika"></img>
        </div>
        {status && (
          <div className="right flex-row-center">
            <div className="avatar" id="avatarHide">
              {props.info.avatar !== undefined ? (
                <img src={props.info.avatar} alt="avatar"></img>
              ) : (
                <img src={avatar} alt="avatar"></img>
              )}
            </div>
            <div className="name">
              <p>{props.info.firstName + " " + props.info.lastName}</p>
            </div>
          </div>
        )}
        <div className="left flex-row-center">
          <div id="burger">
            <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} />
          </div>
        </div>
      </div>
      <div className="navColor sidebar">
        <div className="menu-item" onClick={toggleSidebar}>
          <NavLink activeStyle={active} to="/dashboard">
            <FontAwesomeIcon icon={faCarrot} />
            Dashboard
          </NavLink>
        </div>
        <div className="menu-item" onClick={toggleSidebar}>
          <NavLink activeStyle={active} to="/playground">
            <FontAwesomeIcon icon={faDemocrat} />
            Playground
          </NavLink>
        </div>
        {status && (
          <div className="menu-item" onClick={handleLogOut}>
            <NavLink to="" activeStyle={active}>
              <FontAwesomeIcon icon={faBaby} />
              Log out
            </NavLink>
          </div>
        )}
        {!status && (
          <>
            <div className="menu-item" onClick={toggleSidebar}>
              <NavLink to="/login" activeStyle={active}>
                <FontAwesomeIcon icon={faUserInjured} />
                Login
              </NavLink>
            </div>
            <div className="menu-item" onClick={toggleSidebar}>
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
};

const mapsStateToProps = state => {
  return { isLoggedIn: state.isLoggedIn, info: state.info };
};

export default connect(mapsStateToProps, { logOut })(withRouter(Navigation));
