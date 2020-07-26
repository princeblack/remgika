import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
export const Chat = (props) => {
  const data = props.data
  const user = props.info._id
  return (
    <div className="chatBoxItem">
      {data.userId._id === user ? (
        <div className="user">
          <div className="messageBox">
              <p>{data.message}</p>
          </div>
        </div>
      ):(
        <div className="outer">
          <div className="messageBox">
              <p>{data.message}</p>
          </div>
          <p className="userName">{data.userId.firstName +' ' + data.userId.lastName}</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return{
    info : state.info
  }
};


export default connect(mapStateToProps)(Chat);
