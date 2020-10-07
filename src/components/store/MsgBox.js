import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextareaAutosize from "react-autosize-textarea/lib";
import io from "socket.io-client";

let socket;

export const MsgBox = (props) => {
  const logginOut = props.isLoggedIn;
  const [usertext, setUsertext] = useState("");

  const ENDPOINT = "http://localhost:8000";
  const fullName = props.info.firstName + " " + props.info.lastName;
  const room = props.data.userId + "" + props.info._id;
  console.log(room);
  const user = props.info._id;
  const friend = props.data.userId 
  socket = io(ENDPOINT);
  useEffect(() => {
    socket.emit("join", { room: room, name: fullName, userId: user , friend: friend});
  }, [room, user, fullName,friend]);

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
  console.log(event);
  // if (event.key === "Enter") {
  // }
  if (usertext) {
    console.log(usertext);
    socket.emit("chatMessage", {
      message: usertext,
      room: room,
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
