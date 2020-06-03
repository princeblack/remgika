import React, { Component } from "react";
import { connect } from "react-redux";
import { writerImage, writerInfomation, deleteCommenter,allUser } from "../../actions";
import moment from "moment";
import CommentInfo from "./CommentInfo";

class Comment extends Component {
  async componentDidMount() {
    //   this.props.allUser()
    const writerpictur = await this.props.comment.writer;
    const writerInfomation = await this.props.comment.writer
    this.props.writerImage( writerpictur);    
    this.props.writerInfomation( writerInfomation)
  }
  render() {
    const playgroundId= this.props.data._id;
    const commentPlayId = this.props.comment.postId        
    const userInfo = this.props.allUserInfo.map((el, index)=>{      
      return(
        <CommentInfo userInfo={el} key={index} comment={this.props.comment} picture={this.props.writerImg} play={this.props.data}></CommentInfo>
      )
    })
    return(
        <> 
        {playgroundId === commentPlayId && (
          userInfo
        )}
        </>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    addComment: state.addComment,
    writerImg: state.writerImg,
    writerInfo: state.writerInfo,
    info: state.info,
    isLoggedIn: state.isLoggedIn,
    allUserInfo: state.allUserInfo
  };
};

export default connect(mapStateToProps, {
  writerImage,
  allUser,
  writerInfomation,
  deleteCommenter,
})(Comment);
