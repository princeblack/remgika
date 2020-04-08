import React, { Component } from "react";
import { deleteImage, allMyImage } from "../actions/index";
import { connect } from "react-redux";

class Userimg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: false,
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
    const id = this.props.data._id;
    this.props.deleteImage(id);
  }

  render() {
    if (this.props.ImageIsDelete) {
       setTimeout(() => {
         window.location.reload(false);
       }, 1);
    }
    return (
      <>
        <img src={this.props.data.imgCollection} alt="user"></img>
        <button onClick={this.handleDeleteClick}> Delete</button>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ImageIsDelete: state.ImageIsDelete,
    proImage: state.proImage,
  };
};

export default connect(mapStateToProps, { deleteImage, allMyImage })(Userimg);
