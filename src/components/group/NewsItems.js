import React, { Component, useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import avatar from "../../img/avatar.png";
import "../../scss/groupNews.scss";
import { getAllGroupNews } from "../../actions";
import { GroupNewsImag } from "./GroupNewsImag";
import moment from "moment";

export const NewsItems = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  let image;
  image = props.data.imgCollection.map((el, index) => {
    return <GroupNewsImag data={el} key={index}></GroupNewsImag>;
  });
  const date = moment(props.data.createdAt).fromNow();
  // console.log(props.data.content.length);
  let content = props.data.content.split("");
  let text = content.join("");
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  if (content.length > 600) {
    if (!isOpen) {
      text = content.slice(0, 600).join("") + "....." + "  ";
    } else {
      text = content.join("");
    }
  }

  return (
    <>
      <div className="contenair">
        <div className="info">
          <img src={avatar} alt="user"></img>
          {/* <span>usr name is here</span> */}
          <strong>{date}</strong>
        </div>
        <div className="content">
          <div className="text">
            <p>
              {text}
              {content.length > 600 && (
                <a onClick={toggle}>   {isOpen ? "" : "Read more"}</a>
              )}
            </p>
          </div>
          {props.data.imgCollection.length > 0 && <div>{image}</div>}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { getAllGroupNews })(NewsItems);
