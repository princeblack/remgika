import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllGroupMembers,
  urlGroupPage,
  removeToAdmin,
} from "../../actions/index";
import { NavLink } from "react-router-dom";

export const RemoveAdmin = (props) => {
  const [show, setShow]= useState(false)
  useEffect(() => {
    if (props.removeAdmin) {
      const group = props.group;
      props.urlGroupPage(group);
      props.getAllGroupMembers(group);
    }
  }, [props.removeAdmin]);

  const removeAdmin = (e) => {
    const group = props.group;
    const user = props.data._id;
    props.removeToAdmin(group, user);
  };
  const showOption = ()=>{
    setShow(!show)
  }
  const user = props.data;
  const image = props.data.imgCollection[0];

  return (
    <>
      <div className="admin">
      <NavLink to={`/user/${props.data._id}`}>
      <img src={image} alt="user"></img>
        <p>
          {user.firstName} {user.lastName}
        </p>
      </NavLink>
      <button onClick={showOption}>Remove</button>
    </div>
      {show && 
      <div className="option">
        <di className="text">
          <h2>You are sure you want to remove this user from the admin</h2>
        </di>
        <div className="choice">
          <button onClick={removeAdmin}>Yes I am sure</button>
          <button onClick={showOption} className="reject">No cancel </button>
        </div>
      </div>
      }
    </>
  );
};

const mapStateToProps = (state) => ({
  removeAdmin: state.removeAdmin,
});

export default connect(mapStateToProps, {
  removeToAdmin,
  urlGroupPage,
  getAllGroupMembers,
})(RemoveAdmin);
