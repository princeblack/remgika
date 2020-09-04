import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { OneUser } from "../../actions";
import "../../scss/user.scss";
import { NavbarToggler } from "reactstrap";
import less from "../../img/less.svg";
import more from "../../img/more.svg"
import moment from "moment";

export const UserPage = (props) => {
  const [state, setstate] = useState();
  const [info, setInfo] = useState(true);


  useEffect(() => {
    const id = props.match.params.id;
    props.OneUser(id);
  }, [props.match.params.id]);
  console.log(props.getOneUser);
  useEffect(() => {
    if (props.getOneUser._id) {
      setstate(props.getOneUser.imgCollection[0]);
    }
  }, [props.getOneUser]);
  const handleToggleInfo =(e)=>{
      e.preventDefault();
      setInfo(! info)
  }
  const date = new Date(props.getOneUser.createdAt)
  const create = moment(date).format("dddd, MMMM D Y");
  return (
    <div className="user-container">
      {props.getOneUser._id && (
        <>
          <di className="user-Image">
            <div
              className="firstDiv"
              style={{ backgroundImage: `url(${state})` }}
            ></div>
            <div className="image">
              <div
                className="theUser"
                style={{ backgroundImage: `url(${state})` }}
              ></div>
              <h1>
                {props.getOneUser.firstName} {props.getOneUser.lastName}
              </h1>
            </div>
            <div className="lastDiv"></div>
          </di>
          <div className="information">
            <div className="info-container">
              <div className="toggle">
                  <img src={ info ? less : more} alt="info" onClick={handleToggleInfo}></img>
                  <h2> information</h2>
              </div>
              {info &&(
                  <div className="info">
                     <p><span>Name:</span> {props.getOneUser.firstName}</p> 
                     <p><span>Last Name: </span>{props.getOneUser.lastName}</p> 
                     <p><span>since: </span>{create}</p> 
                  </div>
              )
              }
            </div>
            <div className="publication"></div>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  getOneUser: state.getOneUser,
});

export default connect(mapStateToProps, { OneUser })(UserPage);
