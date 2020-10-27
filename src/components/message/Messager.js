import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Uses from "./Uses";
import "../../scss/message.scss";
import { OneUser, chatMembers } from "../../actions";
import Chat from "./Chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareDown } from "@fortawesome/free-solid-svg-icons";
import socket from "../Sockect";

export const Messager = (props) => {
  const user = props.info._id;
  useEffect(() => {
    if (props.info._id) {
      props.chatMembers();
    }
  }, [props.info._id]);

  useEffect(() => {
    if (props.msgIsRead) {
      props.chatMembers();
    }
  }, [props.msgIsRead]);

  const toggleSidebar = (e) => {
    const sidebar = document.querySelector(".user-container-lelt");
    if (sidebar) {
      sidebar.classList.toggle("slide-left");
    }
  };

  return (
    <>
      {props.userMsg &&  props.info._id &&
        
        props.userMsg.length > 0 ? (
          <>
            <div className="toggleMsgBox">
              <FontAwesomeIcon
                className="toggleMsg"
                icon={faCaretSquareDown}
                onClick={toggleSidebar}
              ></FontAwesomeIcon>
              <h2>Messages</h2>
            </div>
            <div className="message-container">
              {props.userMsg.length > 0 && (
                <div div className="user-container-lelt">
                  {props.userMsg.map((el, index) => {
                    return (
                      <Uses data={el} toggle={toggleSidebar} key={el._id}></Uses>
                    );
                  })}
                </div>
              )}
              {props.info && <Chat />}
            </div>
          </>
        ) : (
          <div className="info-box">
            <div>
              <h1>sorry you do not have a conversation with another user yet.</h1>
              <h4>
                If you write another user and they reply to you then you will see
                your conversation here
              </h4>
            </div>
          </div>
        )
      }
    </>
  );
};

const mapStateToProps = (state) => ({
  info: state.info,
  userMsg: state.userMsg,
  msgIsRead: state.msgIsRead,
});

export default connect(mapStateToProps, { OneUser, chatMembers })(Messager);
