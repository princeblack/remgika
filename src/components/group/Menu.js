import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUsers,
  faNewspaper,
  faCalendarCheck,
  faCaretSquareDown,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import News from "./News";
import  Members  from "./Members";
import Chat  from "./Chat";
import Events  from "./Events";
import  Admin  from "./Admin";
import ChatRoom  from "./ChatRoom";
import ChatContainer from "./ChatContainer";
import io from 'socket.io-client'

let socket;

export const Menu = (props) => {
  const [newsPage, setNewsPage] = useState(false);
  const [membresPage, setMembersPage] = useState(true);
  const [eventsPage, setEventsPage] = useState(true);
  const [chatPage, setChatPage] = useState(true);
  const [adminPage, setAdminPage] = useState(true);

  useEffect(() => {
    if (membresPage && eventsPage && chatPage && adminPage) {
      setNewsPage(newsPage);      
    }
  }, [membresPage,eventsPage,chatPage,adminPage])

  const handleNewsPage = (e) => {
    e.preventDefault()
    setNewsPage(!newsPage);
    if (newsPage === true) {
      setMembersPage(true);
      setEventsPage(true);
      setChatPage(true);
      setAdminPage(true);
    }
  };
  const handleMembersPage = (e) => {
    e.preventDefault()
    setMembersPage(!membresPage);
    if (membresPage === true) {
      setEventsPage(true);
      setChatPage(true);
      setAdminPage(true);
      setNewsPage(true);
    }
  };
  const handleEventsPage = (e) => {
    e.preventDefault()
    setEventsPage(!eventsPage);
    if (eventsPage === true) {
      setChatPage(true);
      setAdminPage(true);
      setNewsPage(true);
      setMembersPage(true);
    }
  };
  const handleChatPage = (e) => {
    e.preventDefault()
    setChatPage(!chatPage);
    if (chatPage === true) {
      setAdminPage(true);
      setNewsPage(true);
      setMembersPage(true);
      setEventsPage(true);
    }
  };
  const handleAdminPage = (e) => {
    e.preventDefault()
    setAdminPage(!adminPage);
    if (adminPage === true) {
      setChatPage(true);
      setNewsPage(true);
      setMembersPage(true);
      setEventsPage(true);
    }
  };

  return (
    <>
      <div className="menu">
        <div className="" onClick={handleNewsPage}>
          <FontAwesomeIcon icon={faNewspaper} />
          <button>News</button>
        </div>
        <div className="" onClick={handleMembersPage}>
          <FontAwesomeIcon icon={faUsers} />
          <button>Members</button>
        </div>
        <div className="" onClick={handleEventsPage}>
          <FontAwesomeIcon icon={faCalendarCheck} />
          <button>Events</button>
        </div>
        <div className="" onClick={handleChatPage}>
          <FontAwesomeIcon icon={faComments} />
          <button>Chat</button>
        </div>
        <div className="more" onClick={handleAdminPage}>
          <FontAwesomeIcon icon={faCaretSquareDown} />
        </div>
      </div>
      {!newsPage && (
        <div className="groupContent">
          <News data={props.data}></News>
        </div>
      )}
      {!membresPage && (
        <div className="groupMembers">
          <Members data={props.data}></Members>
        </div>
      )}
      {!eventsPage && (
        <div className="eventPage">
          <Events data={props.data}></Events>
        </div>
      )}
      {!chatPage && (
        <div className="chatPage">
          <ChatContainer data={props.data}></ChatContainer>
        </div>
      )}
      {!adminPage && (
        <div className="adminPage">
          <Admin></Admin>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return{
    info : state.info
  }
};

export default connect(mapStateToProps)(Menu);
