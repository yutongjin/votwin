import { useEffect, useState } from "react";
import UserTable from "./UserTable.js";
import UserForm from "./UserForm.js";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addUserAction,refreshUser, sendAddUserRequest, saveUserAction, sendSaveUserRequest, init, checkUserAction, deleteUserAction, sendDeleteUserRequest, sendCheckedUserRequest, deleteSelectedUserAction, sendDeleteSelectedUserRequest} from "../actions/userActions";
function UserTool(props) {
  const SERVER_URL = "http://localhost:3005/users";
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

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
    //dispatch(checkUserAction(userObject));
   dispatch(sendCheckedUserRequest(userObject));
  }
  function onUserAdd(userObject) {
    //dispatch(addUserAction(userObject));
    dispatch(sendAddUserRequest(userObject));
  }

  function onUserSave(userObject) {
    // Build out what the new model will look like should the PUT succeedes
    //dispatch(saveUserAction(userObject));
    dispatch(sendSaveUserRequest(userObject));
  }

  function onUserDelete(userObject) {
    // Build out what the new model will look like should the DELETE succeedes
    //dispatch(deleteUserAction(userObject));
    dispatch(sendDeleteUserRequest(userObject));
  }
  function onUserDeleteSelect() {
    // Build out what the new model will look like should the DELETE succeedes

    //dispatch(deleteSelectedUserAction());
    dispatch(sendDeleteSelectedUserRequest(users.filter((user) => user.checked)));
  }

  return (
    <div>
      <Router>
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
            <UserTable
              userList={users}
              onSaveHandler={onUserSave}
              onDeleteHandler={onUserDelete}
              onCheckedHandler={onCheckedHandler}
              onTriggerDeleteSelected={onUserDeleteSelect}
            />
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
