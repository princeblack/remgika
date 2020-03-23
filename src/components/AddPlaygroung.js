import React, { Component } from "react";
import { connect } from "react-redux";
import { handleLogin } from "../actions";
import { playground } from "../actions/index";
import axios from "axios";

// import { Link, NavLink, withRouter } from "react-router-dom";
// import { Redirect } from "react-router-dom";
// import { Link, NavLink, withRouter } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import "../scss/Addplayground.scss";
class AddPlaygroung extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      title: "",
      street: "",
      postalCode: "",
      city: "",
      description: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }
  maxSelectFile = event => {
    let files = event.target.files; // create file object
    if (files.length > 3) {
      const msg = "Only 3 images can be uploaded at a time";
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
    console.log(event.target.files);
    var files = event.target.files;
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) && this.checkMimeType(event)
    ) {
        
        // if return true allow to setState
        this.setState({
          imageUrl: files
        });
      }
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.playground(this.state);
    // const data = new FormData();
    // for (var x = 0; x < this.state.imageUrl.length; x++) {
    //   data.append("file", this.state.imageUrl[x]);
    // }

    // axios
    //   .post("http://localhost:8000/playground", data, {
    //     // receive two    parameter endpoint url ,form data
    //   })

    //   .then(res => {
    //     // then print response status
    //     console.log(res.statusText);
    //   });
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const addPlay = this.props.addPlay;

    return (
      <>
        {isLoggedIn ? (
          <>
            <LoginHeader />
            <div className="addPlaygroung-form">
              <form onSubmit={this.handleSubmit}>
                <div className="row flex-revcol-left">
                  <input
                    type="file"
                    name="myImage"
                    onChange={this.handlefiles}
                  />
                </div>
                <div className="row flex-revcol-left">
                  <input
                    className="input-transition"
                    name="title"
                    type="text"
                    value={this.state.title}
                    placeholder="title or place name"
                    onChange={this.handleInputChange}
                    id="title"
                    required
                  />
                </div>
                <div className="row flex-revcol-left">
                  <input
                    className="input-transition"
                    name="street"
                    type="text"
                    value={this.state.street}
                    placeholder=" Addresse"
                    onChange={this.handleInputChange}
                    id="street"
                    required
                  />
                </div>
                <div className="row flex-revcol-left">
                  <input
                    className="input-transition"
                    name="postalCode"
                    type="text"
                    value={this.state.postalCode}
                    placeholder="Postal Code"
                    onChange={this.handleInputChange}
                    id="postalCode"
                    required
                  />
                </div>
                <div className="row flex-revcol-left">
                  <input
                    className="input-transition"
                    name="city"
                    type="text"
                    value={this.state.city}
                    placeholder=" City"
                    onChange={this.handleInputChange}
                    id="city"
                    required
                  />
                </div>
                <div className="row flex-revcol-left">
                  <input
                    className="input-transition"
                    name="description"
                    type="text"
                    placeholder="description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    id="description"
                    required
                  />
                </div>*
                <input
                  className="addPlay-submit"
                  type="submit"
                  value="Submit"
                  // onClick={() => this.fileInput.click()}
                />
              </form>
              {addPlay ? (
                <div className="addPlaygound-accept">
                  <p> the playground is add successfuly</p>
                </div>
              ) : (
                this.shandleSubmit && (
                  <div className="addPlaygound-erreur">
                    <p>Sorry somethings wint r</p>
                  </div>
                )
              )}
              <div></div>
            </div>
          </>
        ) : (
          <div>
            <p>please you need to be loged to Add a playground</p>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    addplay: state.addPlay,
    info: state.info
  };
};
export default connect(mapStateToProps, { playground, handleLogin })(
  AddPlaygroung
);
