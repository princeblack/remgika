import React, { Component } from "react";
import { connect } from "react-redux";
import { handleLogin } from "../actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class LoginHeader extends Component {
  render() {
    return (
      <>
        <header>
          <div className="icon-go-back">
            <Link to="/">
              <FontAwesomeIcon icon={faArrowLeft}  />
            </Link>
          </div>
        </header>
      </>
    );
  }
}
const mapStateToProps = state => {
  return { isLoggedIn: state.isLoggedIn };
};
export default connect(mapStateToProps, { handleLogin })(LoginHeader);
