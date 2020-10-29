import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { passwordForgot } from "../../actions";
import "../../scss/password.scss";
export const PasswordForgot = (props) => {
  const [email, setEmail] = useState();
  const [showSpinner, setShowSpinnerl] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

useEffect(() => {
    if (props.passForgot) {
        if (showSpinner) {
            setTimeout(() => {
                setShowSpinnerl(false)
                setShowConfirmation(true)
            }, 2000);
        }
        
    }
}, [props.passForgot])
useEffect(()=>{
    if (showConfirmation) {
        setShowConfirmation(false)
    }
    return()=>{
        setShowConfirmation(false)
    }
},[])
  const handleInput = (event) => {
    setEmail(event.target.value);
  };
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  const handleReturn = (e)=>{
    setShowConfirmation(false)
      return props.history.push('/login')
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const userEmail = validateEmail(email);
    if (userEmail) {
      setShowSpinnerl(true);
      const data = {
        email: email,
      };
      props.passwordForgot(data);
    }
  };

  if (showConfirmation) {
    setTimeout(() => {
       props.history.push('/login')
    }, 3000);
}
  return (
    <div className="container">
      <div className="password-box">
        <div className="text">
          <h2>Please enter your email</h2>
          <h3>make sure you enter your email correctly.</h3>
          <h3>
            A confirmation email will be sent to you so that you can change your
            password
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <p>
              Email <span>*</span>
            </p>
            <input
              type="email"
              required
              placeholder="Enter your email"
              onChange={handleInput}
              value={email}
            ></input>
          </div>
          <div className="button">
            <NavLink to="/login">Cancel</NavLink>
            <input type="submit" value="Submit"></input>
          </div>
        </form>
        {showSpinner && (
          <div className="spinner">
           <div className="container">
            <div className="prong">
              <div className="inner"></div>
            </div>
            <div className="prong">
              <div className="inner"></div>
            </div>
            <div className="prong">
              <div className="inner"></div>
            </div>
            <div class="prong">
              <div className="inner"></div>
            </div>
            <div className="prong">
              <div className="inner"></div>
            </div>
            <div className="prong">
              <div className="inner"></div>
            </div>
            <div className="prong">
              <div className="inner"></div>
            </div>
            <div className="prong">
              <div className="inner"></div>
            </div>
            <div className="prong">
              <div className="inner"></div>
            </div>
            <div className="prong">
              <div className="inner"></div>
            </div>
            <div className="prong">
              <div className="inner"></div>
            </div>
            <div className="prong">
              <div className="inner"></div>
            </div>
            </div>
          </div>
        )}
        {showConfirmation && (
            <div className="confirmation">
                <h2>Please check your email for password reset instructions</h2>
                <button onClick={handleReturn}> OK </button>
            </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  passForgot: state.passForgot,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { passwordForgot })(PasswordForgot);
