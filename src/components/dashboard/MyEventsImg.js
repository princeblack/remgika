import React, { Component } from "react";

export class MyEventsImg extends Component {
  render() {
    return (
      <div>
        <img src={this.props.data} alt="playground"></img>
      </div>
    );
  }
}

export default MyEventsImg;
