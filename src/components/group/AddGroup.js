import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { addNewsGroup, authorise } from "../../actions/index";
import { faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";
import { NavLink, withRouter } from "react-router-dom";

import "../../scss/addGroup.scss";

export const AddGroup = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [spinner, setSpinner] = useState(false);
  const [check, setCheck] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    props.authorise();
    async function n() {
      if (props.addGroup) {
        setTimeout(() => {
          setSpinner(false);
          setCheck(true);
        }, 2000);
      }
    }
    async function m() {
      if (props.addGroup) {
        setTimeout(() => {
          setCheck(false);
          props.authorise();
        }, 4000);
      }
    }
    async function f() {
      if (props.addGroup) {
        setTimeout(() => {
          setRedirect(true);
          props.authorise();
        }, 6000);
      }
    }
    m();
    n();
    f();
  }, [props.addGroup]);

  const handlefiles = (event) => {
    for (let index = 0; index < event.target.files.length; index++) {
      var imgBlok = document.getElementById("image-block");
      var output = document.createElement("Img");
      output.src = URL.createObjectURL(event.target.files[index]);
      // eslint-disable-next-line no-loop-func
      output.onload = () => {
        URL.revokeObjectURL(output.src); // free memory
      };
      if (imgBlok.childNodes.length > 0) {
        // Or just `if (element.childNodes.length)`
        // It has at least one
        imgBlok.replaceChild(output, imgBlok.lastChild);
      } else {
        imgBlok.appendChild(output);
      }
    }

    // }
  };

  const onSubmit = (e) => {
    setSpinner(true);
    const data = new FormData();
    for (const key of Object.keys(e.imgCollection)) {
      data.append("imgCollection", e.imgCollection[key]);
    }
    for (var key in e) {
      data.append(key, e[key]);
    }
    props.addNewsGroup(data);
    props.authorise();
  };
  const isLoggedIn = props.isLoggedIn;

  let data;
  if (isLoggedIn) {
    data = props.info.group.slice(-1);
  }
  console.log(data);
  console.log(props.info);
  return (
    <>
      {isLoggedIn ? (
        <>
          {redirect && <Redirect to={`/group/${data[0]}`}> </Redirect>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                name="groupName"
                placeholder="Group Name"
                ref={register({ required: true })}
              ></input>
              {errors.groupName && <span>This field is required</span>}
            </div>
            <div>
              <textarea
                name="description"
                placeholder="Group description"
                rows="7"
                ref={register({ required: true })}
              ></textarea>
              {errors.description && <span>This field is required</span>}
            </div>
            <div>
              <input
                id="img-input"
                onChange={handlefiles}
                name="imgCollection"
                multiple
                type="file"
                ref={register({ required: true })}
              ></input>
              {errors.imgCollection && <span>This field is required</span>}
            </div>
            <div id="image-block"></div>
            <div>
              <select name="confidentiality" ref={register({ required: true })}>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
              {errors.confidentiality && <span>This field is required</span>}
            </div>
            <input type="submit" className="submit" />
            {spinner && (
              <div className="spinner-container">
                <FontAwesomeIcon icon={faSpinner} className="spinner" />
              </div>
            )}
            {check && (
              <div className="check-container">
                <FontAwesomeIcon icon={faCheck} className="spinner" />
                <p> The Group is created successfully</p>
              </div>
            )}
          </form>
        </>
      ) : (
        <>
          <div>
            <h2>please you need to be logged to create a Group</h2>
          </div>
          <div className="sign-container">
            <div className="not-sign">
              <NavLink to="/login">SIGN IN</NavLink>
              <NavLink to="/signup">SIGN UP</NavLink>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    addGroup: state.addGroup,
    info: state.info,
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, { addNewsGroup, authorise })(AddGroup);
