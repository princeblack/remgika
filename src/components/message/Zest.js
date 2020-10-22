import React, { useEffect } from "react";
import { connect } from "react-redux";
import { OneUser, chatMembers } from "../../actions";
import Messager from "./Messager";
import socket from "../Sockect";
import Uses from "./Uses";

export const Zest = (props) => {
  useEffect(() => {
    if (props.info._id) {
      props.getUnread();
    }
  }, [props.info._id]);
  // let count = 0
  // console.log(props.getRefrec, `${count + 1}`);

  // const user = props.info._id;
  // useEffect(() => {
  //   if (user) {
  //     socket.emit("myChat", {
  //       room: user,
  //     });
  //   }
  // }, [user]);

  // useEffect(() => {
  //   socket.on("newMessage", ({ user, text }) => {
  //     console.log('newMessage');
  //     props.getUnread();
  //   });
  // }, [])

  console.log(props.userMsg);
  return (
    <div className="message-container">
      {props.userMsg.length > 0 && (
        <div div className="user-container">
          {props.userMsg.map((el, index) => {
            return <Uses data={el} key={el._id}></Uses>;
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  info: state.info,
  getOneUser: state.getOneUser,
  isLoggedIn: state.isLoggedIn,
  userMsg: state.userMsg,
  getRefrec: state.getRefrec,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { chatMembers })(Zest);
