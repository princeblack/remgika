import React, { useEffect } from "react";
import { connect } from "react-redux";
import avatar from "../../img/avatar.png";
import { addToAdmin, getAllGroupMembers,urlGroupPage } from "../../actions";

export const Addadmin = (props) => {
  const member = props.data;
  let IamAdminUser = false;
  for (let index = 0; index < props.urlGroupInfo.admin.length; index++) {
    const element = props.urlGroupInfo.admin[index];
    if (element._id === props.data._id) {
      IamAdminUser = true;
    }
  }

  const addAdmin = (e)=>{
    e.preventDefault()
    const group = props.urlGroupInfo._id
    const user = props.data._id
    props.addToAdmin(group,user)
  }
  useEffect(() => {
    if (props.addNewAdmin) {
      const group = props.urlGroupInfo._id
      props.urlGroupPage(group)
      props.getAllGroupMembers(group)
      console.log('yes');
    }
   
  }, [props.addNewAdmin])
  return (
    <>
      {!IamAdminUser && (
        <div className="member">
          <img src={avatar} alt="user"></img>
          <p>
            {member.firstName} {member.lastName}
          </p>
          <button onClick={addAdmin}>add to admin</button>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  urlGroupInfo: state.urlGroupInfo,
  addNewAdmin: state.addNewAdmin
});


export default connect(mapStateToProps,{addToAdmin,getAllGroupMembers,urlGroupPage})(Addadmin);
