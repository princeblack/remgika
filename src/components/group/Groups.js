import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Groups extends Component {
  render() {
    const image = this.props.data.imgCollection
    return (
      <div className="items">
        <NavLink className="a_link-group_url"
          to={`/group/${this.props.data._id}`}
        >
        <div className="img-title">
          <img src={image} alt="avatar"></img>
          <div className="group-info">
            <p>{this.props.data.groupName}</p>
            <span>{this.props.data.members} members</span>
          </div>
        </div>
        </NavLink>
        <div className="visit-button">
          <button>
            <NavLink
              to={`/group/${this.props.data._id}`}
            >
              Visit
            </NavLink>
          </button>
        </div>
      </div>
    );
  }
}
