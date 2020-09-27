import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp, handleLogin } from "../../actions";
import LoginHeader from "./LoginHeader";
import black from "../../img/black-man-phone.svg";
import { Link } from "react-router-dom";
import '../../scss/sign.scss'
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "Admin",
      imgCollection: "",
      city: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.checkMimeType = this.checkMimeType.bind(this);
    this.maxSelectFile = this.maxSelectFile.bind(this);
  }
  handleInputChange(e) {lastName
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }
   maxSelectFile (event) {
    let files = event.target.files; // create file object
    if (files.length > 1) {
      event.target.value = null; // discard selected file
      return false;
    }
    return true;
  };
  checkMimeType (event)  {
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
  
     handleFiles  (event)  {
      if (this.maxSelectFile(event) && this.checkMimeType(event)) {
        // if return true allow to setState
        console.log(event.target.files[0]);
        this.setState({
          imgCollection: event.target.files[0]
        });
      }
    };
  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData()
    data.append("firstName",this.state.firstName)
    data.append("lastName",this.state.lastName)
    data.append("email",this.state.email)
    data.append("password",this.state.password)
    data.append("role",this.state.role)
    data.append("imgCollection",this.state.imgCollection)
    data.append("city",this.state.city)

    this.props.signUp(data);

  }
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const sign = this.props.sign;
    return (
      <>
        {isLoggedIn ? (
          <Redirect to="/dashboard" />
        ) : sign ? (
          <Redirect to="/dashboard" />
        ) : (
          <div id="sign-up">
            <LoginHeader />
            <div className="sign-body">
              {black && (
                <>
                                <div id="sign-img">
                <img src={black} alt="remgika"></img>
              </div>
              <div className="sign-form">
                <h1>SIGN UP</h1>
                <form onSubmit={this.handleSubmit}>
                <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      type="file"
                      placeholder="Profile picture"
                      onChange={this.handleFiles}
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="firstName"
                      type="text"
                      value={this.state.firstName}
                      placeholder="First Name"
                      onChange={this.handleInputChange}
                      id="firstName"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="lastName"
                      type="text"
                      value={this.state.lastName}
                      placeholder="Last Name"
                      onChange={this.handleInputChange}
                      id="lastName"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="city"
                      type="text"
                      value={this.state.lastName}
                      placeholder="city or address"
                      onChange={this.handleInputChange}
                      id="lastName"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="email"
                      type="email"
                      value={this.state.email}
                      placeholder="Email"
                      onChange={this.handleInputChange}
                      id="email"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      id="password"
                      required
                    />
                  </div>
                  <input
                    className="login-submit"
                    type="submit"
                    value="Submit"
                  />
                </form>
                <p>
                  Already have an account? <Link to="/login">Sign In</Link>
                </p>
              </div>
                </>
              )}
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
    sign: state.sign,
    info: state.info
  };
};
export default connect(mapStateToProps, { handleLogin, signUp })(SignUp);
