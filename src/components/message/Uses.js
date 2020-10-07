import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUnread } from "../../actions";

const Uses = (props) => {
  useEffect(() => {
    props.getUnread(props.data._id);
  }, [props.data._id]);




  const id = props.info._id + "" + props.data._id;

  return (
    <NavLink to={`Chat/${props.data._id}`}>
      <img src={props.data.imgCollection} alt="user"></img>
      <div className="info">
        <p>
          {props.data.firstName + " " + props.data.lastName + " "}
        </p>
      </div>
    </NavLink>
  );
};

const mapStateToProps = (state) => ({
  msgUnRead: state.msgUnRead,
  info: state.info,
});

export default connect(mapStateToProps, { getUnread })(Uses);
