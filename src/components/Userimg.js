import React, { Component } from "react";
import { handleLogin } from "../actions";
import Navigation from "./Navigation";

export class Userimg extends Component {
  // handleClick(e) {
  //   // console.log(e.target.src);
         
  //     return <Navigation data={this.props.data.imgCollection}></Navigation>;
  // }
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
