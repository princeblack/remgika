import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  authorise,
  handleLogin,
  profileImage,
  allMyImage,
  deleteImage,
} from "../../actions/index";
import "../../scss/Dashboard.scss";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgCollection: "",
      test: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }
  forceUpdateHandler() {
    this.forceUpdate();
  }
  maxSelectFile = (event) => {
    let files = event.target.files; // create file object
    if (files.length > 1) {
      // const msg = "Only 1 images can be uploaded at a time";
      event.target.value = null; // discard selected file
      return false;
    }
    return true;
  };

  checkMimeType = (event) => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = "";
    // list allow mime type
    const types = ["image/png", "image/jpeg", "image/gif"];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      // eslint-disable-next-line no-loop-func
      if (types.every((type) => files[x].type !== type)) {
        // create error message and assign to container
        err += files[x].type + " is not a supported format\n";
      }
    }
    if (err !== "") {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      return false;
    }
    return true;
  };

  checkFileSize = (event) => {
    let files = event.target.files;
    let size = 15000;
    let err = "";
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err += files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    if (err !== "") {
      event.target.value = null;
      return false;
    }

    return true;
  };

  handlefiles = (event) => {
    var files = event.target.files;
    if (this.maxSelectFile(event) && this.checkMimeType(event)) {
      // if return true allow to setState
      this.setState({
        imgCollection: files,
      });
    }
  };

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    for (const key of Object.keys(this.state.imgCollection)) {
      data.append("imgCollection", this.state.imgCollection[key]);
    }
    if (this.state.imgCollection.length > 0) {
      this.props.profileImage(data);
    }
  }
  handleDeleteClick() {
    const id = this.props.proImage[0]._id;
    this.props.deleteImage(id);
  }
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const data = this.props.info;
    const fileNum = this.state.imgCollection.length;
    if (this.props.ImageIsDelete) {
      setTimeout(() => {
        window.location.reload(false);
      }, 0);
    }
    return (
      <>
        {!isLoggedIn ? (
          <Redirect to="/login" />
        ) : (
          <div className="dashboard">
            <div className="profile">
              <div className="user">
                <div className="user-data">
                  <label htmlFor="email">First Name </label>
                  <span>{data.firstName}</span>
                </div>
                <div className="user-data">
                  <label htmlFor="email">Last Name </label>
                  <span>{data.lastName}</span>
                </div>
                <div className="user-data">
                  <label htmlFor="email">Email ID </label>
                  <span>{data.email}</span>
                </div>
              </div>
              <div className="row flex-revcol-left fileNum">
                {this.props.proImage.length <= 0 ? (
                  <>
                    <button onClick={() => this.fileInput.click()}>
                      Upload profile image
                    </button>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      name="myImage"
                      id="myImage"
                      required
                      onChange={this.handlefiles}
                      ref={(fileInput) => (this.fileInput = fileInput)}
                    />
                    {this.state.imgCollection.length > 0 && (
                      <p> {fileNum} Files </p>
                    )}
                    <input
                      className="addPlay-submit"
                      type="submit"
                      value="Submit"
                      onClick={this.handleSubmit}
                    />
                  </>
                ) : (
                  <div className="avatar" id="avatarHide">
                    {this.props.proImage[0] !== undefined && (
                      <div className="imgContainer">
                        <img
                          src={this.props.proImage[0].imgCollection}
                          alt="profile"
                        ></img>
                        <button onClick={this.handleDeleteClick}>
                          {" "}
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    info: state.info,
    proImage: state.proImage,
    valideImg: state.valideImg,
    ImageIsDelete: state.ImageIsDelete,
  };
};
export default connect(mapStateToProps, {
  authorise,
  handleLogin,
  profileImage,
  allMyImage,
  deleteImage,
})(Profile);
