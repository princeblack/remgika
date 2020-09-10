import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { NavLink } from 'react-router-dom'

export const ProfileEvent = (props) => {
    const image = props.data.imgCollection[0]
    const date = new Date(props.data.start);
  const create = moment(date).format("dddd, MMMM D Y");
    return (
        <div className="event">
            <NavLink to={`/eventPage/${props.data._id}`}>
            <div
              className="image"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className="event-info">
                <div className="date">{create}</div>
                <div className="title">{props.data.eventName}</div>
            </div>
            </NavLink>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEvent)
