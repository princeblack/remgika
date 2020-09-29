import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'; 
export  const BackNav = (props)=> {
    const url = props.data
    return (
      <>
        <div className="icon-go-back">
          <Link to={`/${url}`}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>
      </>
    );
  
}

export default connect()(withRouter(BackNav));
