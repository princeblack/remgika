import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

export  class BackNav extends Component {
  render() {
    const back = this.props.history.goBack
    return (
      <>
        <div className="icon-go-back">
          {/* <Link to="/groups"> */}
            <FontAwesomeIcon icon={faArrowLeft}  onClick={back}/>
          {/* </Link> */}
        </div>
      </>
    );
  }
}

export default connect()(withRouter(BackNav));
