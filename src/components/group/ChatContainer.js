import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ChatRoom from "./ChatRoom";
import { faPaperPlane, faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Picker } from "emoji-mart";
import "../../scss/chat.scss";
import io from "socket.io-client";
import { getGroupChats } from "../../actions";
import Chat from "./Chat";
import ScrollToBottom from "react-scroll-to-bottom";
// import { css } from "glamor";
import TextareaAutosize from "react-autosize-textarea";

let socket;

export const ChatContainer = (props) => {
  const [welcome, setWelcome] = useState("");
  const [usertext, setUsertext] = useState("");
  const [show, setShow] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  var [page, setPage] = useState(0);
  let test = 1;
  const logginOut = props.isLoggedIn;
  const ENDPOINT = "http://localhost:8000";

  // const ENDPOINT = "https://node-server.remgika.com/";
  const fullName = props.info.firstName + " " + props.info.lastName;
  const room = props.data._id;
  const user = props.info._id;

  let skip = 0;
  let limit = 10;
  let loading = false;
  socket = io(ENDPOINT);
  // connected to the room
  useEffect(() => {
    socket.emit("join", { room: room, name: fullName, userId: user });
  }, [room, user, fullName]);

  useEffect(() => {
    props.getGroupChats(room, skip, limit);
  }, [room]);

  useEffect(() => {
    if (logginOut === false) {
      return () => {
        socket.emit("disconnect");
        socket.off();
      };
    }
  }, [logginOut]);

  useEffect(() => {
    socket.on("message", ({ name, user, text }) => {
      props.getGroupChats(room);
    });
  }, []);

  let chats = [...props.groupChats].reverse();
  //  maping alles messages
  let allChatMessages;
  allChatMessages = chats.map((el, index) => {
    return <Chat data={el} key={el._id}></Chat>;
  });

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

  const handleChange = (e) => {
    e.preventDefault();
    setUsertext(e.target.value);
  };

  // send message to the room
  const sendMessage = (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
    }
    if (usertext) {
      socket.emit("sendMessage", {
        message: usertext,
        room: room,
        name: fullName,
        userId: user,
      });
      setUsertext("");
    }
  };

  // const ROOT_CSS = css({
  //   height: "50vh",
  //   width: "85%",
  // });
  function clearEmo() {
    if (show) {
      setShow(!show);
    }
  }

  return (
    <div className="chatContainer">
      <ScrollToBottom>
        <div className="chatItems" onClick={clearEmo}>
          {allChatMessages}
        </div>
      </ScrollToBottom>
      <div className="input">
        <div className="text-input">
          <TextareaAutosize
            value={usertext}
            placeholder="Type a messsage..."
            onChange={handleChange}
            onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
          />
          <FontAwesomeIcon
            icon={faSmile}
            onClick={handleShowIcon}
            title="Choose an emoji"
          ></FontAwesomeIcon>
        </div>
        <div className="emo">
          <FontAwesomeIcon
            icon={faPaperPlane}
            title="Send "
            onClick={sendMessage}
          ></FontAwesomeIcon>
        </div>
      </div>
      <div>
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
  );
};

const mapStateToProps = (state) => {
  return {
    info: state.info,
    isLoggedIn: state.isLoggedIn,
    groupChats: state.groupChats,
    groupChatsData: state.groupChatsData,
  };
};

export default connect(mapStateToProps, { getGroupChats })(ChatContainer);
