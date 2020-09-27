import React, {  } from 'react'
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";

export const IamMember = (props) => {
    const image = props.data.imgCollection
    return (
        <div className="items">
        <NavLink className="a_link-group_url"
          to={`/group/${props.data._id}`}
        >
        <div className="img-title">
          <img src={image} alt="avatar"></img>
          <div className="group-info">
            <p>{props.data.groupName}</p>
            <span>{props.data.members} members</span>
          </div>
        </div>
        </NavLink>
        <div className="visit-button">
          <button>
            <NavLink
              to={`/group/${props.data._id}`}
            >
              Visit
            </NavLink>
          </button>
        </div>
      </div>
    )
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps, {})(IamMember)
