import React, { Component } from "react";
import link from "../img/link.svg";
import unlink from "../img/unlink.svg";
import game from '../img/game.png';

export default class Play extends Component {
  render() {
    return (
        <div className="playgroud-item">
          <div className="userVote">
            <img src={link} alt="like"></img>
            <img src={unlink} alt="unlike"></img>
          </div>
          <img src={game} alt="playground"></img>
          {/*  */}
            <div className="addressItem">
              <div className="address">
                <span>Place:</span>
                <p>{this.props.data.street}</p>
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
