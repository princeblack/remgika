import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

export const MutualFriend = (props) => {
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
        </NavLink>
      </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MutualFriend)
