import React, { Component } from "react";
import link from "../img/link.svg";
import unlink from "../img/unlink.svg";

export default class Play extends Component {
  render() {
    return (
        <div className="playgroud-item">
          <div className="userVote">
            <img src={link} alt="like"></img>
            <img src={unlink} alt="unlike"></img>
          </div>
          <img src={this.props.data.imageUrl} alt="playground"></img>
          {/*  */}
            <div className="addressItem">
              <div className="address">
                <span>Place:</span>
                <p>{this.props.data.address.street}</p>
              </div>
              <div className="addressDistance">
                <span>Distance:</span>
                <p>15km </p>
              </div>
            </div>
          {/*  */}
          <div className="description">
            <p>{this.props.data.description}</p>
          </div>
        </div>
    );
  }
}
