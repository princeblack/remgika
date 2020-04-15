import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleLogin } from '../../actions';
import { playground } from '../../actions/index';
import done from '../../img/done.svg'
import LoginHeader from '../login-signUp/LoginHeader';
import '../../scss/Addplayground.scss';
class AddPlaygroung extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgCollection: "",
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
      const msg = 'Only 3 images can be uploaded at a time';
      event.target.value = null; // discard selected file
      return false;
    }
    return true;
  };

  checkMimeType = event => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = '';
    // list allow mime type
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      // eslint-disable-next-line no-loop-func
      if (types.every(type => files[x].type !== type)) {
        // create error message and assign to container
        err += files[x].type + ' is not a supported format\n';
      }
    }
    if (err !== '') {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      return false;
    }
    return true;
  };

  checkFileSize = event => {
    let files = event.target.files;
    let size = 15000;
    let err = '';
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err += files[x].type + 'is too large, please pick a smaller file\n';
      }
    }
    if (err !== '') {
      event.target.value = null;
      return false;
    }

    return true;
  };

  handlefiles = event => {
    var files = event.target.files;
    if (this.maxSelectFile(event) && this.checkMimeType(event)) {
      // if return true allow to setState
      this.setState({
        imgCollection: files
      });
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    for (const key of Object.keys(this.state.imgCollection)) {
      data.append('imgCollection', this.state.imgCollection[key]);
    }
    for (var key in this.state) {
      data.append(key, this.state[key]);
    }
    this.props.playground(data);
    this.setState(state => ({
      imgCollection: "",
      title: "",
      street: "",
      postalCode: "",
      city: "",
      description: ""
    }));
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const addPlay = this.props.addplay;
    const fileNum = this.state.imgCollection.length
    if (addPlay) {
      setTimeout(() =>{
        window.location.reload(false)
      },5000)
    }
    return (
      <>
        {isLoggedIn ? (
          <>
            <LoginHeader />
            <div className="addPlaygroung-form">
              <form onSubmit={this.handleSubmit}>
                <div className="row flex-revcol-left fileNum">
                  <button onClick={() => this.fileInput.click()}>
                    Pick File
                  </button>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name="myImage"
                    id="myImage"
                    required
                    onChange={this.handlefiles}
                    multiple
                    ref={fileInput => (this.fileInput = fileInput)}
                  />
                  {this.state.imgCollection.length > 0 && (
                    <p> {fileNum} Files </p>
                  )}
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
                  <textarea
                    className="input-transition"
                    name="description"
                    type="text"
                    placeholder="description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    id="description"
                    required
                    maxLength={150}
                    cols="30"
                    rows="5"
                  />
                </div>
                <input
                  className="addPlay-submit"
                  type="submit"
                  value="Submit"
                />
              </form>
              {addPlay && (
                <div className="addPlaygound-accept" id="accept">
                  <p> the playground is add successfuly</p>
                  <img src={done} alt="done"></img>
                </div>
              )}
              <div></div>
            </div>
          </>
        ) : (
          <div>
            <p>please you need to be logged to Add a playground</p>
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
export default connect(mapStateToProps, { playground, handleLogin })(AddPlaygroung);
