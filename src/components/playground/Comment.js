import React, { Component } from "react";
import close from "../../img/close.svg";
import classNames from "classnames";
import {comment} from '../../actions/index'
import { connect } from "react-redux";

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.commentSubmit = this.commentSubmit.bind(this);
    this.toggleCommenter = this.toggleCommenter.bind(this);
  }
  onSubmit = (e) => {
    //  e.preventDefault();
    const data = new FormData();
    data.append("commenter", this.state.comment);

    // this.props.comment(data);
  };
  commentSubmit = (e) => {
    const data = new FormData();
    data.append("commenter", this.state.comment);
  };
  toggleCommenter(commet, e) {
    this.setState({
      activeCommet: this.state.activeCommet === commet ? null : commet,
    });
  }
  render() {
    const index = this.props.playIndex;
    const commet = this.props.playIndex;
    return (
      <div
        className={classNames("feedback", {
          show: this.state.activeCommet === commet,
          hide: this.state.activeCommet !== commet,
        })}
      >
        <div className="close-container">
          <img
            className="close"
            src={close}
            alt="close"
            onClick={this.toggleCommenter.bind(this, commet)}
          ></img>
        </div>
        <form
          className="commentForm"
          autoComplete="off"
          // onSubmit={this.commentSubmit}
        >
          <textarea maxLength={150} cols="40" rows="5"></textarea>
         <input className="addPlay-submit" onSubmit={this.commentSubmit} type="button" value="Submit"/> 
        </form>
        <hr></hr>
        <div className="all-comment">
          <p>ici</p>
        </div>
      </div>
    );
  }
}
