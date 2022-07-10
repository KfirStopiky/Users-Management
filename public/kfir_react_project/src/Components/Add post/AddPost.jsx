import React, { useState } from "react";
import "./addPost.scss";

function AddPost({ addPost, setShowAddPost, selectedUserId }) {
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  return (
    <div className="add_post_container">
      <div className="add_post_form_container">
        <h1 className="header">New Post - User {selectedUserId}</h1>
        <label htmlFor="">Title</label>
        <input
          type="text"
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <label htmlFor="">Body</label>
        <input
          type="text"
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <div className="btns">
          <button className="btn" onClick={() => setShowAddPost(false)}>
            Cancel
          </button>
          <button
            className="btn"
            onClick={() => {
              addPost(newPost);
              setShowAddPost(false);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
