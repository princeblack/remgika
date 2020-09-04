import React, { Component } from "react";
import { connect } from "react-redux";
import avatar from "../../img/avatar.png";
import { NavLink } from "react-router-dom";

export const MembersItems = (props) => {
  const image = props.data.imgCollection[0]
  return (
    <div className="members-info">
      <NavLink to={`/user/${props.data._id}`}>
      <img src={image} alt="user"></img>
      <div className="info">
      <p>{props.data.firstName}</p>
      <p>{props.data.lastName}</p>
      </div>
      </NavLink>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MembersItems);
