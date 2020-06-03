import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { deleteCommenter } from "../../actions";

class CommentInfo extends Component {
    constructor(props) {
        super(props);
        this.handelDelete = this.handelDelete.bind(this);
      }
    handelDelete(e) {
        this.props.deleteCommenter(this.props.comment._id);
      }
  render() {
    const userId = this.props.userInfo._id;
    const commentId = this.props.comment.writer;
    const date = moment(this.props.comment.createdAt).fromNow()    
    return (
      <>
        {commentId === userId && (
          <>
            <div className="comment-block">
              <div className="author-wihtOutName">
                <a href={this.props.userInfo.firstName}>
                  {this.props.userInfo.firstName.substring(0, 1).toUpperCase()}
                </a>
              </div>
              <div className="comment-info">
                {/* here if the comment author information with the date that is post the comment */}
                {this.props.comment.writer === userId && (
                  <div className="info">
                    <p>{this.props.userInfo.firstName}</p>
                    <p>{this.props.userInfo.lastName}</p>
                    <strong>{date}</strong>
                  </div>
                )}
                {/* he we display de comment content */}
                <p className="commenter">{this.props.comment.content}</p>
                {/* here we check if the user that is connect have the same id that the comment author id . if that yes we display de delete button too authorized the user to delete the comment if he want*/}
                {this.props.isLoggedIn &&
                  this.props.info._id === this.props.comment.writer && (
                    <button onClick={this.handelDelete}>Delete</button>
                  )}
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      info: state.info,
      isLoggedIn: state.isLoggedIn,
    };
  };
  
  export default connect(mapStateToProps,{deleteCommenter})(CommentInfo);
  