import React, { useEffect } from "react";
import { connect } from "react-redux";
import avatar from "../../img/avatar.png";
import { removeMember,getAllGroupMembers } from "../../actions";
import { NavLink } from "react-router-dom";

export const RemoveMembers = (props) => {
  const member = props.data;
  const removeRmbrs = (e) => {
    //   e.preventDefault()
      const group = props.group._id
      const userId = props.data._id
      props.removeMember(group,userId)
  };
  useEffect(() => {
    if (props.removeMembers) {
        const id = props.group._id
        props.getAllGroupMembers(id)
    }
  }, [props.removeMembers])
  const image = props.data.imgCollection[0]
  return (
    <>
      <div className="member">
        <NavLink to={`/user/${props.data._id}`}>
        <img src={image} alt="user"></img>
        <p>
          {member.firstName} {member.lastName}
        </p>
        </NavLink>
        <button onClick={removeRmbrs}>remove</button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
    removeMembers : state.removeMembers
});


export default connect(mapStateToProps,{removeMember,getAllGroupMembers})(RemoveMembers);
