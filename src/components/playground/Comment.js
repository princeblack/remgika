import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteCommenter } from "../../actions";
import moment from "moment";
import CommentInfo from "./CommentInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

export const Comment = (props) => {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickContent = (e) => {
    e.preventDefault();

    setShow(false);
  };
  const date = moment(props.comment.createdAt).fromNow();
  // console.log(props.data.content.length);
  let content = props.comment.content.split("");
  let text = content.join("");
  const toggle = () => {
    setIsOpen(!isOpen);
    setShow(false);
  };
  if (content.length > 400) {
    if (!isOpen) {
      text = content.slice(0, 400).join("") + "....." + "  ";
    } else {
      text = content.join("");
    }
  }
  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const id = props.comment._id;
    props.deleteCommenter(id);
  };
  return (
    <div className="comment-container">
      {props.comment && (
        <div>
          <div className="info-and-delete">
            <div className="container">
              <div className="userPhoto">
                <img
                  src={props.comment.writer.imgCollection[0]}
                  alt="user"
                ></img>
              </div>
              <strong>
                {props.comment.writer.firstName +
                  " " +
                  props.comment.writer.lastName}
              </strong>
              <span>{date}</span>
            </div>
            {props.comment.writer._id === props.info._id && (
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
                {content.length > 400 && (
                  <a onClick={toggle}> {isOpen ? "" : "Read more"}</a>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    addComment: state.addComment,
    info: state.info,
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, {
  deleteCommenter,
})(Comment);
