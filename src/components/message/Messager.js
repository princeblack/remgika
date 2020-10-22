import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Uses from "./Uses";
import "../../scss/message.scss";
import { OneUser, chatMembers } from "../../actions";
import socket from "../Sockect";
import  Chat  from "./Chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope  ,
  faCaretSquareDown
} from "@fortawesome/free-solid-svg-icons"

export const Messager = (props) => {
  useEffect(() => {
    if (props.info._id) {
      props.chatMembers();
    }
  }, [props.info._id]);

  const user = props.info._id;
  useEffect(() => {
    if (user) {
      socket.emit("myChat", {
        room: user,
      });
    }
  }, [user]);

  socket.on("newMessage", ({ name, user, message, files, room, room2  }) => {
    props.chatMembers();
    console.log(user);
  });
  console.log(props.userMsg);

  const  toggleSidebar = (e) => {
    const sidebar = document.querySelector(".user-container-lelt");
    sidebar.classList.toggle("slide-left");
   
  };
  
  return (
    <>
      <div>
        <FontAwesomeIcon className="toggleMsg" icon={faCaretSquareDown} onClick={toggleSidebar}></FontAwesomeIcon>
      </div>
      <div className="message-container">
      {props.userMsg.length > 0 && (
        <div div className="user-container-lelt">
          {props.userMsg.map((el, index) => {
            return <Uses data={el} toggle={toggleSidebar} key={el._id}></Uses>;
          })}
        </div>
      )}
        {props.info && <Chat /> }
    </div>

    </>
  );
};

const mapStateToProps = (state) => ({
  info: state.info,
  getOneUser: state.getOneUser,
  isLoggedIn: state.isLoggedIn,
  userMsg: state.userMsg,
  getRefrec: state.getRefrec,
  countMsg: state.countMsg,
});

export default connect(mapStateToProps, { OneUser, chatMembers })(Messager);
