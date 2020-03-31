import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  authorise,
  handleLogin,
  profileImage,
  allMyImage
} from "../actions/index";
import "../scss/Dashboard.scss";
import Userimg from "./Userimg";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgCollection: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.authorise();
      this.props.allMyImage();
    }
  }

  maxSelectFile = event => {
    let files = event.target.files; // create file object
    if (files.length > 1) {
      const msg = "Only 1 images can be uploaded at a time";
      event.target.value = null; // discard selected file
      console.log(msg);
      return false;
    }
    return true;
  };

  checkMimeType = event => {
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
      if (types.every(type => files[x].type !== type)) {
        // create error message and assign to container
        err += files[x].type + " is not a supported format\n";
      }
    }
    if (err !== "") {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      console.log(err);
      return false;
    }
    return true;
  };

  checkFileSize = event => {
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
      console.log(err);
      return false;
    }

    return true;
  };

  handlefiles = event => {
    var files = event.target.files;
    if (this.maxSelectFile(event) && this.checkMimeType(event)) {
      // if return true allow to setState
      console.log("All files", files);
      this.setState({
        imgCollection: files
      });
    }
  };

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }
  handleClick(e) {}

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
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const data = this.props.info;
    const fileNum = this.state.imgCollection.length;
    let userImage;
    if (this.props.proImage.length > 0) {
      userImage = this.props.proImage.map((el, index) => {
        return <Userimg data={el} key={index}></Userimg>;
      });
    }
    if (this.props.valideImg) {
      setTimeout(() => {
        window.location.reload(false);
      }, 200);
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
                  <input
                    name="firstName"
                    type="text"
                    value={data.firstName}
                    onChange={this.handleInputChange}
                    id="firstName"
                    required
                  ></input>
                </div>
                <div className="user-data">
                  <label htmlFor="email">Last Name </label>
                  <input
                    name="lastName"
                    type="text"
                    value={data.lastName}
                    onChange={this.handleInputChange}
                    id="lastName"
                    required
                  ></input>
                </div>
                <div className="user-data">
                  <label htmlFor="email">Email ID </label>
                  <input
                    name="email"
                    type="text"
                    value={data.email}
                    onChange={this.handleInputChange}
                    id="email"
                    required
                  ></input>
                </div>
              </div>
              <div className="row flex-revcol-left fileNum">
                {this.props.proImage.length <= 0 && (
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
                      ref={fileInput => (this.fileInput = fileInput)}
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
                )}

                <div className="imgContainer">{userImage}</div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    info: state.info,
    proImage: state.proImage,
    valideImg: state.valideImg
  };
};
export default connect(mapStateToProps, {
  authorise,
  handleLogin,
  profileImage,
  allMyImage
})(Profile);
