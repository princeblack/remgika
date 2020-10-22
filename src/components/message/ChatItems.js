import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { readMsg } from "../../actions";

const ChatItems = (props) => {
  return (
    <>
      {props.data && (
        <div className="chatBox">
          {props.info._id === props.data.senderUserId._id ? (
            <div className="my">
              <div className="messageBox">
                <p>{props.data.message}</p>
              </div>
            </div>
          ) : (
            <div className="friend">
              <img
                src={props.data.senderUserId.imgCollection[0]}
                alt={props.data.firtName}
              ></img>
              <div className="messageBox">
                <p>{props.data.message}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  info: state.info,
  allMsg: state.allMsg
});

export default connect(mapStateToProps, {readMsg})(ChatItems);
