import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ChatRoom from "./ChatRoom";
import { faPaperPlane, faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Picker } from "emoji-mart";
import "../../scss/chat.scss";
import ChatOnline from "./ChatOnline";
import io from "socket.io-client";
import { getGroupChats } from "../../actions";
import Chat from "./Chat";
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "glamor";

let socket;

export const ChatContainer = (props) => {
  const [welcome, setWelcome] = useState("");
  const [usertext, setUsertext] = useState("");
  const [show, setShow] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  var [page, setPage] = useState(1);
  let test = 1
  const logginOut = props.isLoggedIn;
  const ENDPOINT = "http://localhost:8000";
  const fullName = props.info.firstName + " " + props.info.lastName;
  const room = props.data._id;
  const user = props.info._id;
  socket = io(ENDPOINT);
  // connected to the room
  useEffect(() => {
    socket.emit("join", { room: room, name: fullName, userId: user });
  }, [room, user, fullName]);

  useEffect(() => {
    if (logginOut) {
      debugger
      props.getGroupChats(room, page);
    }
  }, [room,page,logginOut]);

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
  // console.log(props.groupChats.chats);

  let chats = [];

  if (props.groupChats) {
    if (props.groupChats.chats) {
      chats = [...props.groupChats.chats].reverse();
    }
  }
  // [...props.groupChats].reverse();

  useEffect(() => {
    const fetchData = async () => {
      const scroll = document.querySelector(".css-y1c0xs");
      let left = await props.groupChats.left;
      let total = await props.groupChats.total;
      let skip = await props.groupChats.skip;
       test = skip;

      const name = async () => {
        scroll.addEventListener("scroll", async (event) => {
          // event.preventDefault();
          var element = await event.target;
          if (element.scrollTop === 0) {
            if (left >0) {
              // if (left >= 1) {
              //   if (test >= 1) {
              //     console.log(test, "top");
                  test++
              //     console.log(total, "top+++++++++++++++");
  
                  props.getGroupChats(room, test);
              //   }
              // } else {
              //   console.log("egal 000");
              // }
              console.log(left, 'left');
              console.log(test);
            }
          }
          if (
            element.scrollHeight - element.scrollTop ===
            element.clientHeight
          ) {
            if (left > 0) {
              if (left + chats.length !== total) {
                console.log(left);
                if (test >1 ) {
                  console.log(test, "bottom");
                  test--
                  // console.log(test, "bottom------------");
  
              //   console.log(chats.length);
              // console.log(chattotal);
              props.getGroupChats(room, test);
              element.scrollTop = 100

                }
              }
            }
          }
        });
      };
      name();
    };
    fetchData()
  }, [room,chats,props.groupChats,test]);
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

  const ROOT_CSS = css({
    height: "27vh",
    width: "85%",
  });
  return (
    <div className="chatContainer">
      <ScrollToBottom className={ROOT_CSS}>
        <div className="chatItems">{allChatMessages}</div>
      </ScrollToBottom>
      <div className="input">
        <div className="text-input">
          <input
            value={usertext}
            placeholder="Type a messsage..."
            onChange={handleChange}
          ></input>
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
              search: "Recherche",
              categories: {
                search: "Résultats de recherche",
                recent: "Récents",
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
  };
};

export default connect(mapStateToProps, { getGroupChats })(ChatContainer);
