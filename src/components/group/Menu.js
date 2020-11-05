import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonToggle } from "reactstrap";

import {
  faUsers,
  faNewspaper,
  faCalendarCheck,
  faCaretSquareDown,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import News from "./News";
import Members from "./Members";
import Events from "./Events";
import Admin from "./Admin";
import ChatContainer from "./ChatContainer";

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
  }, [membresPage, eventsPage, chatPage, adminPage, newsPage]);

  const handleNewsPage = (e) => {
    e.preventDefault();
    setNewsPage(false);
    setMembersPage(true);
    setEventsPage(true);
    setChatPage(true);
    setAdminPage(true);
  };
  const handleMembersPage = (e) => {
    e.preventDefault();
    setMembersPage(false);
    setEventsPage(true);
    setChatPage(true);
    setAdminPage(true);
    setNewsPage(true);
  };
  const handleEventsPage = (e) => {
    e.preventDefault();
    setEventsPage(false);
    setChatPage(true);
    setAdminPage(true);
    setNewsPage(true);
    setMembersPage(true);
  };
  const handleChatPage = (e) => {
    e.preventDefault();
    setChatPage(false);
    setAdminPage(true);
    setNewsPage(true);
    setMembersPage(true);
    setEventsPage(true);
  };
  const handleAdminPage = (e) => {
    e.preventDefault();
    setAdminPage(false);
    setChatPage(true);
    setNewsPage(true);
    setMembersPage(true);
    setEventsPage(true);
  };
  const userId = props.info._id;
  let IamAdminUser = false;
  for (let index = 0; index < props.data.admin.length; index++) {
    const element = props.data.admin[index];
    if (element._id === userId) {
      IamAdminUser = true;
    }
  }
  let member = false;

  if ( props.info.group) {
    for (let i = 0; i <  props.info.group.length; i++) {
      if (props.data._id ===  props.info.group[i]) {
        member = true;
      }
    }
  }
  const membersRequest = props.data.joindReq.length;
  return (
    <>
      <div className="menu">
        <div className="" onClick={handleNewsPage}>
          <FontAwesomeIcon icon={faNewspaper} />
          {/* <ButtonToggle autoFocus>News</ButtonToggle> */}
        </div>
        <div className="" onClick={handleMembersPage}>
          <FontAwesomeIcon icon={faUsers} />
          {/* <ButtonToggle>Members</ButtonToggle> */}
        </div>
        <div className="" onClick={handleEventsPage}>
          <FontAwesomeIcon icon={faCalendarCheck} />
          {/* <ButtonToggle>Events</ButtonToggle> */}
        </div>
        {member && 
                <div className="" onClick={handleChatPage}>
                <FontAwesomeIcon icon={faComments} />
                {/* <ButtonToggle>Chat</ButtonToggle> */}
              </div>
        }
        {IamAdminUser && (
          <div className="more" onClick={handleAdminPage}>
            <FontAwesomeIcon icon={faCaretSquareDown}></FontAwesomeIcon>
            <div className="total-request">
              {membersRequest > 0 && (
                <i>{membersRequest}</i>
              )}
            </div>
          </div>
        )}
      </div>
      {!member &&
       <div className="group-about">
       <div className="about">
         <span>About</span>
       </div>
       <div className="about-info">
         <span>{props.data.description}</span>
       </div>
     </div>
       }
      
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
          <Admin data={props.data}></Admin>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    info: state.info,
  };
};

export default connect(mapStateToProps)(Menu);
