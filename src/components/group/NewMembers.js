import React, { useEffect } from "react";
import { connect } from "react-redux";
import avatar from "../../img/avatar.png";
import {joinGroupAccpet, urlGroupPage , getAllGroupMembers, joinGroupRefused} from '../../actions/index'
export const NewMembers = (props) => {
  const user = props.data;
  const group = props.group._id
  const admin = props.info

  useEffect(() => {
    if (props.groupAccpteUser) {
      props.urlGroupPage(group)
    props.getAllGroupMembers(group)
    }
  }, [props.groupAccpteUser])

  useEffect(() => {
    if (props.groupRefusedUser) {
      props.urlGroupPage(group)
    props.getAllGroupMembers(group)
    }
  }, [props.groupRefusedUser])

  const accpet = () => {
    props.joinGroupAccpet(group,user._id,admin._id);
  };

  const refuse = () => {
    props.joinGroupRefused(group,user._id,admin._id);
  };
  return (
    <>
      <div className="member">
        <img src={avatar} alt="user"></img>
        <p>
          {user.firstName} {user.lastName}
        </p>
        <button className="accpet" onClick={accpet}>accepted</button>
        <button onClick={refuse}>decline</button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  info : state.info,
  groupAccpteUser: state.groupAccpteUser,
  groupRefusedUser: state.groupRefusedUser
});


export default connect(mapStateToProps,{joinGroupAccpet,urlGroupPage,getAllGroupMembers,joinGroupRefused})(NewMembers);
