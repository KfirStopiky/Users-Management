import React from "react";
import "./post.scss";

function Post({ post }) {
  return (
    <div className="post_container">
      <div className="post">
        <h3 className="title">
          Title: <span>{post.title}</span>
        </h3>
        <h3 className="title">
          Body: <span>{post.title}</span>
        </h3>
      </div>
    </div>
  );
}

export default Post;
