import React, { useEffect } from "react";
import { useState } from "react";
import "./user.scss";

function User({
  user,
  deleteUser,
  updateUser,
  chooseUser,
  selectedUserId,
  todos,
}) {
  const [hasOpenTasks, setHasOpenTasks] = useState();
  const [showOtherData, setShowOtherData] = useState(false);
  const [showBackGround, setShowBackGround] = useState(false);
  const [userData, setUserData] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    address: {
      street: user.address.street,
      city: user.address.city,
      zipcode: user.address.zipcode,
    },
  });

  const checkOpenTasks = () => {
    let userTasks = todos.filter((todo) => todo.userId === user.id);
    let openTasks = userTasks.filter((todo) => todo.completed === false);
    if (openTasks.length === 0) {
      setHasOpenTasks(false);
    } else {
      setHasOpenTasks(true);
    }
  };

  useEffect(() => {
    checkOpenTasks();
  }, [todos]);

  return (
    <div
      className={hasOpenTasks ? "user-container__open_tasks" : "user-container"}
    >
      <div className={selectedUserId === user.id ? "user_selected" : "user"}>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <label
            className="id_lable"
            onClick={() => {
              setShowBackGround(!showBackGround);
              chooseUser(user.id);
            }}
            htmlFor=""
          >
            ID
          </label>
          <input type="text" defaultValue={user.id} disabled="ture" />
          <label htmlFor="">Name</label>
          <input
            type="text"
            defaultValue={user.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />{" "}
          <label htmlFor="">Email</label>
          <input
            type="text"
            defaultValue={user.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />{" "}
          <br />
          <button
            className="btn"
            onMouseEnter={() => {
              setShowOtherData(true);
            }}
            onClick={() => setShowOtherData(false)}
          >
            {showOtherData ? "Close other data" : "Other Data"}
          </button>
          {showOtherData && (
            <div className="other-data">
              <label htmlFor="">Street</label>
              <input
                type="text"
                defaultValue={user.address.street}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...userData.address, street: e.target.value },
                  })
                }
              />{" "}
              <br />
              <label htmlFor="">City</label>
              <input
                type="text"
                defaultValue={user.address.city}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...userData.address, city: e.target.value },
                  })
                }
              />{" "}
              <br />
              <label htmlFor="">Zip Code</label>
              <input
                type="text"
                defaultValue={user.address.zipcode}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...userData.address, zipcode: e.target.value },
                  })
                }
              />{" "}
            </div>
          )}
          <div className="update_and_delete_btns">
            <button className="btn" onClick={() => updateUser(userData)}>
              Update
            </button>
            <button className="btn" onClick={() => deleteUser(user.id)}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default User;
