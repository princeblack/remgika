import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";

export const Groups = (props) => {
    const image = props.data.imgCollection
    return (
        <div className="group">
            <NavLink to={`/group/${props.data._id}`}>
            <div
              className="firstDiv"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
            </NavLink>
            <NavLink className="link" to={`/group/${props.data._id}`}>
                <div className="title">
                     {props.data.groupName}
                </div>
            </NavLink>

        </div>
    )
}

const mapStateToProps = (state) => ({
    
})



export default connect(mapStateToProps)(Groups)
