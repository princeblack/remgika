import React, { useEffect } from "react";
import { connect } from "react-redux";
import avatar from "../../img/avatar.png";
import { removeMember,getAllGroupMembers } from "../../actions";

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
  return (
    <>
      <div className="member">
        <img src={avatar} alt="user"></img>
        <p>
          {member.firstName} {member.lastName}
        </p>
        <button onClick={removeRmbrs}>remove</button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
    removeMembers : state.removeMembers
});


export default connect(mapStateToProps,{removeMember,getAllGroupMembers})(RemoveMembers);
