import React, { useState } from "react";
import "./addUser.scss";

function AddUser({ toggleRightSide, addUser }) {
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  return (
    <div className="add_user_container">
      <h1>Add new user</h1>
      <form className="add_user_form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="">Name</label>
        <input
          required={true}
          type="text"
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <br />
        <label htmlFor="">Email</label>
        <input
          required={true}
          type="text"
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <br />
        <div className="buttons">
          <button type="submit" className="btn" onClick={toggleRightSide}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn"
            onClick={() => addUser(newUser)}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
