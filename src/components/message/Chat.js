import React, { useEffect, useState, useLayoutEffect } from "react";
import TextareaAutosize from "react-autosize-textarea/lib";
import { connect } from "react-redux";
import {
  myMessages,
  authorise,
  chatMembers,
  readMsg,
  refre,
} from "../../actions";
import ChatItems from "./ChatItems";
import { faPaperPlane, faSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginHeader from "../login-signUp/LoginHeader";
import ScrollToBottom from "react-scroll-to-bottom";
import { Picker } from "emoji-mart";
import { css } from "glamor";
// import socket from "../Sockect";
import { useLocation, Switch } from "react-router-dom";
import io from "socket.io-client";

let socket;

export const Chat = (props) => {
  const [usertext, setUsertext] = useState("");
  const [show, setShow] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [join, setJoin] = useState();
  const [writing, setWriting] = useState();

  const chatId = props.getRefrec._id;
  const fullName = props.info.firstName + " " + props.info.lastName;
  const room = chatId + "" + props.info._id;
  const room2 = props.info._id + "" + chatId;
  const logginOut = props.isLoggedIn;
  const user = props.info._id;
  const friend = chatId;

  useEffect(() => {
    // if (user && chatId ) {
      props.readMsg(chatId);

    const ENDPOINT = "https://node-server.remgika.com";
    socket = io(ENDPOINT);
    socket.emit("chat", {
      room: room,
      room2: room2,
      name: fullName,
      userId: user,
      friend: friend,
    });
    // }

  }, [room, room2, user, fullName, friend, chatId]);

  useEffect(() => {
    const id = props.info._id + "" + chatId;
    const id2 = chatId + "" + props.info._id;
    if (props.info._id && chatId) {
      props.myMessages(id, id2);
    }
  }, [chatId, props.info._id]);


  useEffect(() => {
   if (chatId) {
    socket.on("newChat", ({ name, user, message, files, room, room2 }) => {
      const roomData = room;
      const room2Data = room2;
      const roomCheck = chatId + "" + props.info._id;
      const room2chek = props.info._id + "" + chatId;
      const id = props.info._id + "" + chatId;
      const id2 = chatId + "" + props.info._id;
      if (
        (roomData === roomCheck && room2Data === room2chek) ||
        (roomData === room2chek && room2Data === roomCheck)
      ) {
        props.myMessages(id, id2);
      }
      setJoin("");
      props.readMsg(chatId);
    });
   }
  }, [socket])



  const handleChange = (e) => {
    e.preventDefault();
    setUsertext(e.target.value);
  };
  const handleShowIcon = (e) => {
    if (show) {
      setShow(!show);
    } else {
      setShow(true);
    }
  };

  const handlImo = (e) => {
    setUsertext(usertext + e.native);
    handleShowIcon();
  };

  // // send message to the room
  const sendMessage = (event) => {
    event.preventDefault();
    if (usertext) {
      socket.emit("chatMessage", {
        message: usertext,
        room: room,
        room2: room2,
        name: fullName,
        userId: user,
        friend: friend,
      });
      setUsertext("");
    }
  };
  useEffect(() => {
    return () => {
      socket.emit("leaving", {
        room: room,
        room2: room2,
        name: fullName,
      });
    }
  }, [chatId])
  const ROOT_CSS = css({
    height: "63vh",
    minWidth: 280,
  });

  return (
    <>
      {chatId && (
        <div className="msg-container-box">
          <div className="user-info">
            <img alt="" src={props.getRefrec.imgCollection[0]}></img>
            <div>
              <p>
                {props.getRefrec.firstName + " " + props.getRefrec.lastName}
              </p>
            </div>
          </div>
          {props.myMsg && (
            <div className="message-box-msg">
              <ScrollToBottom className={ROOT_CSS}>
                {props.myMsg.map((el, index) => {
                  return <ChatItems data={el} key={el._id}></ChatItems>;
                })}
              </ScrollToBottom>
            </div>
          )}
          <div className="message-input">
            <FontAwesomeIcon
              icon={faSmile}
              title="Choose an emoji"
              className="smile"
              onClick={handleShowIcon}
            ></FontAwesomeIcon>
            <textarea
              rows={2}
              onChange={handleChange}
              value={usertext}
            ></textarea>
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="submit"
              onClick={sendMessage}
            ></FontAwesomeIcon>
            <div className="thePicker">
              {show && (
                <Picker
                  onSelect={handlImo}
                  set="apple"
                  title="Pick your emoji…"
                  emoji="point_up"
                  skin="5"
                  i18n={{
                    search: "Research",
                    categories: {
                      search: "Search results",
                      recent: "Recent",
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  info: state.info,
  myMsg: state.myMsg,
  isLoggedIn: state.isLoggedIn,
  msgUnRead: state.msgUnRead,
  getRefrec: state.getRefrec,
});

export default connect(mapStateToProps, {
  myMessages,
  authorise,
  chatMembers,
  readMsg,
  refre,
})(Chat);
