import { useEffect, useState } from 'react'
import UserTable from './UserTable.js'
function UserTool(props) {
    let [userList, setUserList] = useState([]);
    const SERVER_URL = 'http://localhost:3005/users';

    function checkHttpStatus(response) {
        if(response.ok) {
            return Promise.resolve(response);
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            return Promise.reject(error);
        }
    }

    useEffect(
        () => {
            fetch(`${SERVER_URL}`)
                .then(checkHttpStatus)
                .then((res) => res.json())
                .then((data) => setUserList(data))
                .catch((error) => console.error(error))
        },
        []
    )

    function onUserAdd(userObject) {
        // Build out what the new model will look like should the PUT succeedes 
        const nextId = userList?.sort((a, b) => (a.id > b.id) ? -1 : 1)[0]?.id + 1;

        let newUserObject = {
            id: nextId ? nextId : 0,
            ...userObject
        }

        const newUserList = [...userList, newUserObject]

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUserObject),
        };
        fetch(`${SERVER_URL}`, requestOptions)
        .then(checkHttpStatus)
        .then(() => updateLocalModel(newUserList))
        .catch((error) => console.error(error))
    }

    function onUserSave(userObject) {
        // Build out what the new model will look like should the PUT succeedes 
        const newUserList = userList.map((user) => {
            return ((
                user.id === userObject.id)
                ? userObject
                : user
            )
        });

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userObject),
        };
        fetch(`${SERVER_URL}/${userObject.id}`, requestOptions)
        .then(checkHttpStatus)
        .then(() => updateLocalModel(newUserList))
        .catch((error) => console.error(error))
    }

    function onUserDelete(userObject) {
        // Build out what the new model will look like should the DELETE succeedes 
        const newUserList = userList.filter((user) => user.id !== userObject.id);

        fetch(`${SERVER_URL}/${userObject.id}`, { method: 'DELETE' })
            .then(checkHttpStatus)
            .then(() => updateLocalModel(newUserList))
            .catch((error) => console.error(error))
    }

    function updateLocalModel(userList) {
        setUserList(userList);
    }

    return (
        <div>

            <UserTable userList={userList} onSaveHandler={onUserSave} onDeleteHandler={onUserDelete} />
            {/* <UserForm onAddHandler={onUserAdd} /> */}
        </div>
    )
}

export default UserTool;