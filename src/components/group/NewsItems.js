import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

// import avatar from "../../img/avatar.png";
import "../../scss/groupNews.scss";
import { getAllGroupNews, deleteNews } from "../../actions";
import { GroupNewsImag } from "./GroupNewsImag";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const NewsItems = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

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
    setShow(false);
  };

  if (content.length > 600) {
    if (!isOpen) {
      text = content.slice(0, 600).join("") + "....." + "  ";
    } else {
      text = content.join("");
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
                  <div className="handledelete" onClick={handleDelete}>
                    Delete
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className="content" onClick={handleClickContent}>
          <div className="text">
            <p>
              {text}
              {content.length > 600 && (
                <a onClick={toggle}> {isOpen ? "" : "Read more"}</a>
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
  return {
    deleteGroupNew: state.deleteGroupNew,
    info: state.info,
  };
};

export default connect(mapStateToProps, { getAllGroupNews, deleteNews })(
  NewsItems
);
