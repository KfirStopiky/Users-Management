import React from "react";
import "./main.scss";
import { useState } from "react";
import { getAllItems } from "../../Utils/utils";
import { useEffect } from "react";
import User from "../User/User";
import AddUser from "../Add User/AddUser";
import Todo from "../Todo/Todo";
import Post from "../Post/Post";
import AddTodo from "../Add Todo/AddTodo";
import AddPost from "../Add post/AddPost";
import { IoSearch } from "react-icons/io5";

function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [chosenUserTodos, setChosenUserTodos] = useState([]);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [posts, setPosts] = useState([]);
  const [chosenUserPosts, setChosenUserPosts] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showTodosAndPosts, setShowTodosAndPosts] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);

  const addUser = (data) => {
    let newId = users[users.length - 1].id + 1;
    let newUserObj = {
      id: newId,
      name: data.name,
      email: data.email,
      address: {
        city: "",
        street: "",
        zipcode: "",
      },
    };
    setUsers([...users, newUserObj]);
    setShowAddUser(false);
  };

  const updateUser = (userDetails) => {
    const userID = userDetails.id - 1;
    let temp_state = [...users];
    let temp_user = { ...temp_state[userID] };
    temp_user = {
      id: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
      address: {
        street: userDetails.address.street,
        city: userDetails.address.city,
        zipcode: userDetails.address.zipcode,
      },
    };
    temp_state[userID] = temp_user;
    setUsers(temp_state);
  };

  const markCompleted = (todoId) => {
    let temp_state = [...todos];
    let temp_todo = temp_state.find((todo) => todo.id === todoId);
    temp_todo.completed = true;
    temp_state[todoId - 1] = temp_todo;
    setTodos(temp_state);
  };

  const addTodo = (newTodo) => {
    let allUserTodos = todos.filter((todo) => todo.userId === selectedUserId);
    let newId = allUserTodos[allUserTodos.length - 1].id + 1;
    let userNewTodoObj = {
      userId: selectedUserId,
      id: newId,
      title: newTodo.title,
      completed: false,
    };
    setChosenUserTodos([...chosenUserTodos, userNewTodoObj]);
    let temp_state = [...todos];
    temp_state[newId - 1] = userNewTodoObj;
    setTodos(temp_state);
  };

  const addPost = (newPost) => {
    let allUserPosts = posts.filter((post) => post.userId === selectedUserId);
    let newId = allUserPosts[allUserPosts.length - 1].id + 1;
    let userNewPostObj = {
      userId: selectedUserId,
      id: newId,
      title: newPost.title,
      body: newPost.body,
    };
    setChosenUserPosts([...chosenUserPosts, userNewPostObj]);
  };

  const chooseUser = (userID) => {
    if (selectedUserId === 0) {
      setSelectedUserId(userID);
      setShowTodosAndPosts(true);
      setChosenUserTodos(todos.filter((t) => t.userId === userID));
      setChosenUserPosts(posts.filter((p) => p.userId === userID));
      setShowAddUser(false);
    } else if (selectedUserId === userID) {
      setSelectedUserId(0);
      setShowTodosAndPosts(false);
    } else {
      setSelectedUserId(userID);
      setChosenUserTodos(todos.filter((t) => t.userId === userID));
      setChosenUserPosts(posts.filter((p) => p.userId === userID));
      setShowAddUser(false);
    }
  };

  const toggleRightSide = () => {
    setShowTodosAndPosts(false);
    setShowAddUser(!showAddUser);
  };

  const deleteUser = (userID) => {
    setUsers(users.filter((user) => user.id !== userID));
  };

  const getUsers = async () => {
    let resp = await getAllItems("https://jsonplaceholder.typicode.com/users");
    setUsers(resp.data);
  };
  const getTodos = async () => {
    let resp = await getAllItems("https://jsonplaceholder.typicode.com/todos");
    setTodos(resp.data);
  };
  const getPosts = async () => {
    let resp = await getAllItems("https://jsonplaceholder.typicode.com/posts");
    setPosts(resp.data);
  };

  useEffect(() => {
    getUsers();
    getTodos();
    getPosts();
  }, []);

  return (
    <div className="main_container">
      <div
        className={
          showAddUser || showTodosAndPosts ? "left_side__open" : "left_side"
        }
      >
        <div className="search">
          <input
            className="search__input"
            type="text"
            placeholder="Search user"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search__button">
            <IoSearch className="search__icon" />
          </button>
        </div>
        <div className="add_user_btn">
          <button className="btn" onClick={toggleRightSide}>
            Add user
          </button>
        </div>
        {users
          // eslint-disable-next-line array-callback-return
          .filter((val) => {
            if (val === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.email.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((user) => {
            return (
              <User
                todos={todos}
                className="user_component"
                user={user}
                key={user.id}
                deleteUser={(userID) => deleteUser(userID)}
                chooseUser={(userID) => chooseUser(userID)}
                selectedUserId={selectedUserId}
                updateUser={(userDetails) => updateUser(userDetails)}
              />
            );
          })}
      </div>
      {showAddUser && (
        <div className="add_user">
          <AddUser
            users={users}
            setUsers={setUsers}
            toggleRightSide={toggleRightSide}
            addUser={(data) => addUser(data)}
          />
        </div>
      )}
      {showTodosAndPosts && (
        <div className="todos_and_posts_container">
          {showAddTodo ? (
            <AddTodo
              selectedUserId={selectedUserId}
              setShowAddTodo={(data) => setShowAddTodo(data)}
              addTodo={(newTodo) => addTodo(newTodo)}
            />
          ) : (
            <div className="todos">
              <div className="header">
                <h1>Todos - User {selectedUserId} </h1>
                <button className="btn" onClick={() => setShowAddTodo(true)}>
                  Add
                </button>
              </div>
              {chosenUserTodos.map((todo, index) => {
                return (
                  <Todo
                    className="todo"
                    key={index}
                    todo={todo}
                    todos={todos}
                    markCompleted={(todoId) => markCompleted(todoId)}
                  />
                );
              })}
            </div>
          )}

          {showAddPost ? (
            <AddPost
              selectedUserId={selectedUserId}
              addPost={addPost}
              setShowAddPost={(data) => setShowAddPost(data)}
            />
          ) : (
            <div className="posts">
              <div className="header">
                <h1>Posts - User {selectedUserId} </h1>
                <button className="btn" onClick={() => setShowAddPost(true)}>
                  Add
                </button>
              </div>
              {chosenUserPosts.map((post, index) => {
                return (
                  <Post
                    className="post"
                    key={index}
                    post={post}
                    setShowAddPost={setShowAddPost}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
