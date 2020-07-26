import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default class BackNav extends Component {
  render() {
    return (
      <>
        <div className="icon-go-back">
          <Link to="/groups">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>
      </>
    );
  }
}
