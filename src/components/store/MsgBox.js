import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextareaAutosize from "react-autosize-textarea/lib";
import io from "socket.io-client";

let socket;

export const MsgBox = (props) => {
  const logginOut = props.isLoggedIn;
  const [usertext, setUsertext] = useState("");

  const ENDPOINT = "https://node-server.remgika.com";
  
  
  const user = props.info._id;
  const friend = props.data.userId 
  socket = io(ENDPOINT);
  useEffect(() => {
    if (props.info._id) {
      const fullName = props.info.firstName + " " + props.info.lastName;
  const room = props.data.userId._id+ "" + props.info._id;
  const room2 = props.info._id + "" + props.data.userId._id
      socket.emit("join", { room: room, room2: room2, name: fullName, userId: user , friend: friend});
    }
    
  }, [props.info._id,props.data.userId]);

  useEffect(() => {
    if (logginOut === false || props.fun) {
      return () => {
        socket.emit("disconnect");
        socket.off();
      };
    }
  }, [logginOut, props.fun ]);

  const handleChange = (e) => {
    e.preventDefault();
    setUsertext(e.target.value);
  };

 // send message to the room
 const sendMessage = (event) => {
  event.preventDefault();

  if (usertext) {
    const fullName = props.info.firstName + " " + props.info.lastName;
  const room = props.data.userId._id + "" + props.info._id;
  const room2 = props.info._id + "" + props.data.userId._id
    socket.emit("sendMessage", {
      message: usertext,
      room: room,
      room2: room2,
      name: fullName,
      userId: user,
      friend: friend
    });
    setUsertext("");
  }
};
  return (
    <>
      {props.toggle && (
        <>
          <div className="msg-container">
            <div className="article-heater">
              <img
                className="image"
                alt=""
                src={props.data.imgCollection[0]}
              ></img>
              <p> {props.data.title}</p>
            </div>
            <div className="msg-div">
              <TextareaAutosize 
              rows="5"
              onChange={handleChange}
              // onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
              value={usertext}
              ></TextareaAutosize>
            </div>
            <div className="choice">
              <button className="submit" onClick={sendMessage}>Submit</button>
              <button className="cancel" onClick={props.fun}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  info: state.info,
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MsgBox);
