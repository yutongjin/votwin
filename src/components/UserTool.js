import { useEffect, useState } from "react";
import UserTable from "./UserTable.js";
import UserForm from "./UserForm.js";
import './styles.css';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAction,
  refreshUser,
  sendAddUserRequest,
  saveUserAction,
  sendSaveUserRequest,
  init,
  checkUserAction,
  deleteUserAction,
  sendDeleteUserRequest,
  sendCheckedUserRequest,
  deleteSelectedUserAction,
  sendDeleteSelectedUserRequest,
} from "../actions/userActions";
function UserTool(props) {
  const SERVER_URL = "http://localhost:3005/users";
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const isFetching = useSelector((state) => state.isFetching);

  let [isLogin, setIsLogin] = useState(false);
  function checkHttpStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      return Promise.reject(error);
    }
  }

  useEffect(() => {
    dispatch(refreshUser());
  }, []);

  function onCheckedHandler(userObject) {
    dispatch(sendCheckedUserRequest(userObject));
  }
  function onUserAdd(userObject) {
    dispatch(sendAddUserRequest(userObject));
  }

  function onUserSave(userObject) {
    dispatch(sendSaveUserRequest(userObject));
  }

  function onUserDelete(userObject) {
    dispatch(sendDeleteUserRequest(userObject));
  }
  function onUserDeleteSelect() {
    dispatch(
      sendDeleteSelectedUserRequest(users.filter((user) => user.checked))
    );
  }

  return (
    <div>
      <Router >
        <nav>
          <ul>
            <li>
              <Link to="/userList">UserList</Link>
            </li>
            <li>
              <Link to="/register">Register Voters</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/userList">
            {isFetching ? (
              <h2>Loading...</h2>
            ) : (
              <UserTable
                userList={users}
                onSaveHandler={onUserSave}
                onDeleteHandler={onUserDelete}
                onCheckedHandler={onCheckedHandler}
                onTriggerDeleteSelected={onUserDeleteSelect}
              />
            )}
          </Route>
          <Route path="/register">
            <UserForm onAddHandler={onUserAdd} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default UserTool;
