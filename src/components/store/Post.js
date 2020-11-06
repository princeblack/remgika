import React from "react";
import ArticleItems from './ArticleItems'

const Post = ({ post, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  
  return (
    <>
      {post.map((el, index) => {
        return <ArticleItems playIndex={index} data={el} key={index}></ArticleItems>;
      })}
    </>
  );
};

export default Post;
