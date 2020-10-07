import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const ChatItems = (props) => {
  console.log(props.data);
  return (
    <>
      {props.data && (
        <div className="chatBox">
          {props.info._id === props.data.userId._id ? (
            <div className="my">
              <p>{props.data.message}</p>
              <img
                src={props.data.userId.imgCollection[0]}
                alt={props.data.firtName}
              ></img>
            </div>
          ) : (
            <div className="friend">
              <img
                src={props.data.userId.imgCollection[0]}
                alt={props.data.firtName}
              ></img>
              <p>{props.data.message}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  info: state.info,
});

export default connect(mapStateToProps, {})(ChatItems);
