import React, { Component } from "react";
import { connect } from "react-redux";
import { writerImage, writerInfomation, deleteCommenter } from "../../actions";
import moment from "moment";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.handelDelete = this.handelDelete.bind(this);
  }
  componentDidMount() {
    this.props.writerImage(this.props.comment.writer);
    this.props.writerInfomation(this.props.comment.writer);
  }
  handelDelete(e) {
    this.props.deleteCommenter(this.props.comment._id);
  }
  render() {
    // console.log(this.props.comment._id);
    // console.log( this.props.data._id, 'playground');
    // console.log(this.props.comment.writer);
    // console.log(this.props.info._id, 'me');

    // console.log(this.props.writerImg[0]);
    // console.log(this.props.writerInfo.user);
    const date = moment(this.props.comment.createdAt).fromNow();
    let spliteName;
    let userImageName;
    if (this.props.writerInfo.user) {
      spliteName = this.props.writerInfo.user.firstName.split("");
      userImageName = spliteName[0].toUpperCase();
    }
    // console.log(userImageName);
    // console.log(this.props.comment);
    console.log(this.props.writerInfo.user);
    
    

    return (
      <>
        {this.props.comment.postId === this.props.data._id && (
          <div className="comment-block">
            {this.props.writerImg[0] ? (
              <div className="author">
                <a href={this.props.writerImg[0].imgCollection}>
                  <img
                    src={this.props.writerImg[0].imgCollection}
                    alt="writer"
                  ></img>
                </a>
              </div>
            ) : (
              <div className="author">
                {userImageName !== undefined && (
                  <a href="jkj">{userImageName}</a>
                )}
              </div>
            )}
            <div className="comment-info">
              {this.props.writerInfo.user && (
                <div className="info">
                  <p>{this.props.writerInfo.user.firstName}</p>
                  <p>{this.props.writerInfo.user.lastName}</p>
                  <strong>{date}</strong>
                </div>
              )}
              <p className="commenter">{this.props.comment.content}</p>
              {this.props.isLoggedIn &&
                this.props.info._id === this.props.comment.writer && (
                  <button onClick={this.handelDelete}>Delete</button>
                )}
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allComment: state.allComment,
    addComment: state.addComment,
    writerImg: state.writerImg,
    writerInfo: state.writerInfo,
    info: state.info,
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, {
  writerImage,
  writerInfomation,
  deleteCommenter,
})(Comment);
