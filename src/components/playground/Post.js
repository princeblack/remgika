import React from "react";
import Play from "./Play";

const Post = ({ post, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      {post.map((el, index) => {
        return <Play playIndex={index} data={el} key={index}></Play>;
      })}
    </>
  );
};

export default Post;
