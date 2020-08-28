import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getAllGroupMembers,urlGroupPage, removeToAdmin} from '../../actions/index';
import avatar from "../../img/avatar.png";

export const RemoveAdmin = (props) => {
    useEffect(() => {
        if (props.removeAdmin) {
          const group = props.group
          props.urlGroupPage(group)
          props.getAllGroupMembers(group)
        }
       
      }, [props.removeAdmin])
    const removeAdmin = (e)=>{
        const group = props.group;
        const user = props.data._id; 
 
        props.removeToAdmin(group, user)
    }
    const user = props.data
    return (
             <div className="admin" >
            <img src={avatar} alt="user"></img>
            <p>{user.firstName} {user.lastName}</p>
            <button onClick={removeAdmin}>Remove</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    removeAdmin: state.removeAdmin
})


export default connect(mapStateToProps, {removeToAdmin,urlGroupPage,getAllGroupMembers})(RemoveAdmin)
