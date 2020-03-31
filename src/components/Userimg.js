import React, { Component } from "react";

export class Userimg extends Component {
  render() {
    return (
      <>
        <img
          src={this.props.data.imgCollection}
          alt="user"
          onClick={this.handleClick}
        ></img>
      </>
    );
  }
}

export default Userimg;
