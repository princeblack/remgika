import React from "react";
import Events from "./Events";

const Post = ({ post, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  
  return (
    <>
      {post.map((el, index) => {
        return <Events playIndex={index} data={el} key={index}></Events>;
      })}
    </>
  );
};

export default Post;
