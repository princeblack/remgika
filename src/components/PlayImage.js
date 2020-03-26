import React, { Component } from 'react'

export class PlayImage extends Component {
    render() {
        return (
          <>
            <img src={this.props.data} alt="playground"></img>
          </>
        );
    }
}

export default PlayImage
