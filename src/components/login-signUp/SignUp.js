import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp, handleLogin } from "../../actions";
import LoginHeader from "./LoginHeader";
import black from "../../img/black-man-phone.svg";
import { Link } from "react-router-dom";
import "../../scss/sign.scss";
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export const SignUp = (props) => {
    const [firstName, setFirstName] = useState("");
    const [ lastName, setLastName] = useState("");
    const [ email, setEmail] = useState("");
    const [ city, setCity] = useState("");
    const [ password, setPassword] = useState("");
    const [ imgCollection, setImgCollection] = useState("");
    const [ role, setRole] = useState("Admin");
    const [location, setLocation] = useState([]);

    const handleFirstName =(e)=>{
        setFirstName(e.target.value)
    }
    const handleLastName =(e)=>{
        setLastName(e.target.value)

    }
    const handleEmail =(e)=>{
        setEmail(e.target.value)

    }
    const handleCity =(e)=>{
        setCity(e.target.value)
        setValue(e.target.value);


    }
    const handlePassword =(e)=>{
        setPassword(e.target.value)

    }
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        // location: { lat: () => 43.6532, lng: () => -79.3832 },
        // radius: 100 * 1000,
        /* Define search scope here */
      },
      debounce: 200,
    });
    const ref = useOnclickOutside(() => {
      // When user clicks outside of the component, we can dismiss
      // the searched suggestions by calling this method
      clearSuggestions();
    });
    const handleSelect = ({ description }) => () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      setCity(description);
      clearSuggestions();
        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setLocation([lng,lat])
        })
        .catch((error) => {
        });
    };
  
    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          id,
          structured_formatting: { main_text, secondary_text},
        } = suggestion;
  
        return (
          <li key={id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });

  const maxSelectFile = (event) => {
    let files = event.target.files; // create file object
    if (files.length > 1) {
      event.target.value = null; // discard selected file
      return false;
    }
    return true;
  };
  const checkMimeType = (event) => {
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

  const handleFiles = (event) => {
    if (maxSelectFile(event) && checkMimeType(event)) {
      setImgCollection( event.target.files[0])

    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("password", password);
    data.append("role", role);
    data.append("imgCollection", imgCollection);
    data.append("city", city);
    data.append("location", [location[0], location[1]]);

    props.signUp(data);
  };
  const isLoggedIn = props.isLoggedIn;
    const sign = props.sign;
    const emailExist = props.emailExist
    return (
      <>
        {isLoggedIn ? (
          <Redirect to="/dashboard" />
        ) : sign ? (
          <Redirect to="/dashboard" />
        ) : (
          <div id="sign-up">
            {/* <LoginHeader /> */}
            <div className="sign-body">
              {black && (
                <>
                                <div id="sign-img">
                <img src={black} alt="remgika"></img>
              </div>
              <div className="sign-form">
                <h1>SIGN UP</h1>
                <form onSubmit={handleSubmit}>
                <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      type="file"
                      placeholder="Profile picture"
                      onChange={handleFiles}
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="firstName"
                      type="text"
                      value={firstName}
                      placeholder="First Name"
                      onChange={handleFirstName}
                      id="firstName"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="lastName"
                      type="text"
                      value={lastName}
                      placeholder="Last Name"
                      onChange={handleLastName}
                      id="lastName"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="city"
                      type="text"
                      value={city}
                      placeholder="city"
                      onChange={handleCity}
                      id="city"
                      required
                    />
                    {/* We can use the "status" to decide whether we should display the dropdown or not */}
                    {status === "OK" && <ul>{renderSuggestions()}</ul>}
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="email"
                      type="email"
                      value={email}
                      placeholder="Email"
                      onChange={handleEmail}
                      id="email"
                      required
                    />
                  </div>
                  {emailExist &&
                  <p className="emailExist">this email is already used for another account</p>
                  }
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={handlePassword}
                      id="password"
                      required
                    />
                  </div>
                  <div className="terms">
                    <p>By clicking Sign Up, you agree to our <a href="/terms">Terms</a> , <a href="/privacy">Privacy Policy</a></p>
                  </div>
                  <input
                    className="login-submit"
                    type="submit"
                    value="Sign Up"
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
};

const mapStateToProps = (state) => ({
    isLoggedIn : state.isLoggedIn,
    sign : state.sign,
    emailExist :  state.emailExist
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, {signUp})(SignUp);
