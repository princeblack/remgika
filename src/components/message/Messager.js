import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Uses from "./Uses";
import "../../scss/message.scss";
import { OneUser } from "../../actions";

export const Messager = (props) => {
  return (
    <>
      <div className="message-container">
        {props.info.messagerUsers && (
          <>
            {props.info.messagerUsers.map((el, index) => {
              return <Uses data={el} key={el._id}></Uses>;
            })}
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  info: state.info,
  getOneUser: state.getOneUser,
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps, { OneUser })(Messager);
