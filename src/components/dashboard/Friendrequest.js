import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {accepteFriend,refuseFriend} from "../../actions"
export const Friendrequest = (props) => {
  const accepte = (e)=>{
    e.preventDefault();
      const id = props.data._id
      props.accepteFriend(id)
  }
  const refuse = (e)=>{
    e.preventDefault();
    const id = props.data._id
    props.refuseFriend(id)
}
  return (
    <div className="user">
      <NavLink to={`/user/${props.data._id}`}>
        <div
          className="image"
          style={{ backgroundImage: `url(${props.data.imgCollection[0]})` }}
        ></div>
        <div className="name">
          <p>
            {props.data.firstName} {props.data.lastName}
          </p>
        </div>
        <div className="request-container">
            <button className="accepte" onClick={accepte}>Accepted</button>
            <button className="refuse" onClick={refuse}>Decline</button>
        </div>
      </NavLink>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps,{accepteFriend,refuseFriend})(Friendrequest);
