import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import "../../scss/groupNews.scss";
import { getAllGroupNews, deleteNews } from "../../actions";
import { GroupNewsImag } from "./GroupNewsImag";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const NewsItems = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [showPop, setShowPop] = useState(false);

  let image;
  image = props.data.imgCollection.map((el, index) => {
    return <GroupNewsImag data={el} key={index}></GroupNewsImag>;
  });
  const date = moment(props.data.createdAt).fromNow();
  // console.log(props.data.content.length);
  let content = `${props.data.content.split(" ")}`;
  // let content = props.data.content.split("");

  // console.log(content);
  let text;
  // text = `${content.join("")}`;
  // console.log(props.data.content);
  const toggle = () => {
    setIsOpen(!isOpen);
    setShow(false);
  };

  if (content.length > 600) {
    if (!isOpen) {
      // text = content.slice(0, 600).join("") + "....." + "  ";
      text= content.split()
      console.log(text);
      let test = text.join('  ')
      console.log(test);
    } else {
      text = content.join(" ");
    }
  }
  const user = props.data.userId.imgCollection[0];

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  const handleClickContent = (e) => {
    e.preventDefault();

    setShow(false);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const id = props.data._id;
    props.deleteNews(id);
  };
  const showOption = () => {
    setShowPop(!showPop);
    console.log(showPop);
  };
  return (
    <>
      <div className="contenair">
        <div className="info">
          <div className="container">
            <NavLink to={`/user/${props.data.userId._id}`}>
              <div className="userImage">
                <img id="userPicture" src={user} alt="user"></img>
              </div>
            </NavLink>
            <strong>{date}</strong>
          </div>
          {props.data.userId._id === props.info._id && (
            <div className="delete">
              <FontAwesomeIcon icon={faEllipsisH} onClick={handleClick} />
              {show && (
                <>
                  <div className="handledelete" onClick={showOption}>
                    Delete
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {showPop && (
                <div className="option">
                  <di className="text">
                    <h2>
                      You are sure you want to remove this post ?
                    </h2>
                  </di>
                  <div className="choice">
                    <button onClick={handleDelete}>Yes I am sure</button>
                    <button onClick={showOption} className="reject">
                      No cancel{" "}
                    </button>
                  </div>
                </div>
              )}
        <div className="content" onClick={handleClickContent}>
          <div className="text">
            <pre>
            {props.data.content}
              {/* {content} */}
              {/* {`${content}`} */}
              {content.length > 600 && (
                <a onClick={toggle}> {isOpen ? "" : "Read more"}</a>
              )}
            </pre>
          </div>
          {props.data.imgCollection.length > 0 && <div>{image}</div>}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    deleteGroupNew: state.deleteGroupNew,
    info: state.info,
  };
};

export default connect(mapStateToProps, { getAllGroupNews, deleteNews })(
  NewsItems
);
