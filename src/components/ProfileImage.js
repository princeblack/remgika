import React, { Component } from 'react'

export class ProfileImage extends Component {
    render() {
        console.log(this.props.data.imgCollection);
        
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

export default ProfileImage
