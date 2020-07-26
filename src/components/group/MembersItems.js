import React, { Component } from "react";
import { connect } from "react-redux";
import avatar from "../../img/avatar.png";

export const MembersItems = (props) => {
  return (
    <div className="members-info">
      <img src={avatar} alt="user"></img>
      <div className="info">
      <p>{props.data.firstName}</p>
      <p>{props.data.lastName}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MembersItems);
