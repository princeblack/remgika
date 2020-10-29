import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { validateToken, passwordReset } from "../../actions";
import "../../scss/password.scss";

export const PasswordReset = (props) => {
    const [passOne, setPassOne] = useState(false);
    const [passTwoo, setPassTwoo] = useState(false);
    const [alert, setAlert] = useState()
    const [showSpinner, setShowSpinnerl] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (props.match.params.id) {
      const token = props.match.params.id.toString();
      const data = {
        token: token,
      };
      props.validateToken(data);
    }
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.passIsUpdate) {
        if (showSpinner) {
            setTimeout(() => {
                setShowSpinnerl(false)
                setShowConfirmation(true)
            }, 2000);
        }        
    }
}, [props.passIsUpdate])

if (showConfirmation) {
    setTimeout(() => {
       props.history.push('/login')
    }, 3000);
}
useEffect(()=>{
    if (showConfirmation) {
        setShowConfirmation(false)
    }
    return()=>{
        setShowConfirmation(false)
    }
},[])

  const handlePassOne = (e)=>{
      e.preventDefault()
      setPassOne(e.target.value)
  }
  const handlePassTwoo = (e)=>{
    e.preventDefault()
    setPassTwoo(e.target.value)
}
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passOne.length >= 6 && passTwoo.length >= 6) {
        if (passOne === passTwoo) {
            setAlert()
            setShowSpinnerl(true);
            const token = props.match.params.id.toString();
            const data = {
                password: passOne,
                token : token
              };
            props.passwordReset(data)
        }else{
            setAlert('Password must be the same')
        }
    }else{
        setAlert('Password must be at least 6 characters')
    }
  };
  return (
    <div className="reset-container">
      {props.match.params.id ? (
        <>
          {props.valideToken === true && (
            <>
              <div className="newPass">
                <div className="text">
                  <h2>Please enter a new password</h2>
                  <p>
                    If you arrived on this page without having requested to
                    change your password you can just leave this page.
                  </p>
                  <p>
                    otherwise enter your new password to change your old
                    password
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="input">
                    <div>
                      <p>
                        Password<span>*</span>
                      </p>
                      <input
                        type="password"
                        required
                        placeholder=" New Password"
                        onChange={handlePassOne}
                      ></input>
                      <strong>{alert}</strong>
                    </div>
                    <div>
                      <p>
                        Password<span>*</span>
                      </p>
                      <input
                        type="password"
                        required
                        placeholder=" New Password"
                        onChange={handlePassTwoo}
                      ></input>
                      <strong>{alert}</strong>
                    </div>
                  </div>
                  <div className="submit">
                    <button type="submit">Submit</button>
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
                    <h2>
                    Your password has been successfully changed
                    </h2>
                  </div>
                )}
              </div>
            </>
          )}
          {props.valideToken === Error && (
            <>
              <div>
                <h2>Sorry this link is expired or invalid</h2>
                <p>
                  If you arrived on this page without having requested to change
                  your password you can just leave this page.
                </p>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div>Oop what can I do for you ?</div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  valideToken: state.valideToken,
  passIsUpdate :  state.passIsUpdate
});

export default connect(mapStateToProps, { validateToken, passwordReset })(
  PasswordReset
);
