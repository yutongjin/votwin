import { useEffect, useState } from "react";
import UserTable from "./UserTable.js";
function UserTool(props) {
  let [userList, setUserList] = useState([]);
  const SERVER_URL = "http://localhost:3005/users";

  let [triggerDeleteSelect, setTriggerDeleteSelect] = useState(false);
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
    fetch(`${SERVER_URL}`)
      .then(checkHttpStatus)
      .then((res) => res.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error(error));
  }, []);

  function onCheckedHandler(userObject) {
    const newUserList = userList.map((user) => {
      return user.id === userObject.id
        ? {
            ...user,
            checked: !user.checked,
          }
        : user;
    });
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...userObject,
        checked: !userObject.checked,
      }),
    };
    fetch(`${SERVER_URL}/${userObject.id}`, requestOptions)
      .then(checkHttpStatus)
      .then(() => updateLocalModel(newUserList))
      .catch((error) => console.error(error));
  }
  function onUserAdd(userObject) {
    // Build out what the new model will look like should the PUT succeedes
    const nextId = userList?.sort((a, b) => (a.id > b.id ? -1 : 1))[0]?.id + 1;

    let newUserObject = {
      id: nextId ? nextId : 0,
      ...userObject,
    };

    const newUserList = [...userList, newUserObject];

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserObject),
    };
    fetch(`${SERVER_URL}`, requestOptions)
      .then(checkHttpStatus)
      .then(() => updateLocalModel(newUserList))
      .catch((error) => console.error(error));
  }

  function onUserSave(userObject) {
    // Build out what the new model will look like should the PUT succeedes
    const newUserList = userList.map((user) => {
      return user.id === userObject.id ? userObject : user;
    });

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userObject),
    };
    fetch(`${SERVER_URL}/${userObject.id}`, requestOptions)
      .then(checkHttpStatus)
      .then(() => updateLocalModel(newUserList))
      .catch((error) => console.error(error));
  }

  function onUserDelete(userObject) {
    // Build out what the new model will look like should the DELETE succeedes
    const newUserList = userList.filter((user) => user.id !== userObject.id);

    fetch(`${SERVER_URL}/${userObject.id}`, { method: "DELETE" })
      .then(checkHttpStatus)
      .then(() => updateLocalModel(newUserList))
      .catch((error) => console.error(error));
  }
  function onUserDeleteSelect() {
    // Build out what the new model will look like should the DELETE succeedes

    const newUserList = userList.filter((user) => !user.checked);
    const deletedList = userList.filter((user) => user.checked);
    deletedList.forEach((element) => {
      fetch(`${SERVER_URL}/${element.id}`, { method: "DELETE" })
        .then(checkHttpStatus)
        .catch((error) => console.error(error));
    });
    updateLocalModel(newUserList);
  }

  function updateLocalModel(userList) {
    setUserList(userList);
  }

  return (
    <div>
      <UserTable
        userList={userList}
        onSaveHandler={onUserSave}
        onDeleteHandler={onUserDelete}
        onCheckedHandler={onCheckedHandler}
        onTriggerDeleteSelected={onUserDeleteSelect}
      />
    </div>
  );
}

export default UserTool;
