import React, { useState } from "react";
import "./addTodo.scss";

function AddTodo({ setShowAddTodo, addTodo, selectedUserId }) {
  const [newTodo, setNewTodo] = useState({ title: "" });

  return (
    <div className="add_todo_container">
      <div className="add_todo_form_container">
        <h1 className="header">New Todo - User {selectedUserId}</h1>
        <label htmlFor="">Title</label>
        <input
          required={true}
          type="text"
          onChange={(e) => setNewTodo({ title: e.target.value })}
        />
        <div className="btns">
          <button className="btn" onClick={() => setShowAddTodo(false)}>
            Cancel
          </button>
          <button
            className="btn"
            onClick={() => {
              addTodo(newTodo);
              setShowAddTodo(false);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
