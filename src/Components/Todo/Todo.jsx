import React from "react";
import "./todo.scss";

export default function Todo({ todo, markCompleted }) {
  return (
    <div className="todo_container">
      <div className="todo">
        <h3 className="title">
          Title: <span className="title--content">{todo.title}</span>
        </h3>
        <h3 className="completed">
          Completed:{" "}
          <span>
            {todo.completed ? "True" : "False"}
            {todo.completed === false && (
              <button className="btn" onClick={() => markCompleted(todo.id)}>
                Mark Completed
              </button>
            )}
          </span>
        </h3>
      </div>
    </div>
  );
}
