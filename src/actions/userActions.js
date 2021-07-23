export const ADD_USER = "ADD_USER";
export const SAVE_USER = "SAVE_USER";
export const CHECK_USER = "CHECK_USER";
export const DELETE_USER = "DELETE_USER";
export const DELETE_SELECTED_USER = "DELETE_SELECTED_USER";

export const REFRESH = "REFRESH";

export function refresh(data) {
  return {
    type: REFRESH,
    data,
  };
}

export const sendAddUserRequest = (newUser) => (dispatch) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  };
  fetch("http://localhost:3005/users", requestOptions)
    .then(checkHttpStatus)
    .catch((error) => console.error(error))
    .then(dispatch(refreshUser()));
};
export const sendSaveUserRequest = (newUser) => (dispatch) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  };
  fetch(`http://localhost:3005/users/${newUser.id}`, requestOptions)
    .then(checkHttpStatus)
    .catch((error) => console.error(error))
    .then(dispatch(refreshUser()));
};
export const sendCheckedUserRequest = (newUser) => (dispatch) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...newUser,
      checked: !newUser.checked,
    }),
  };
  fetch(`http://localhost:3005/users/${newUser.id}`, requestOptions)
    .then(checkHttpStatus)
    .catch((error) => console.error(error))
    .then(dispatch(refreshUser()));
};

export const sendDeleteUserRequest = (newUser) => (dispatch) => {
  fetch(`http://localhost:3005/users/${newUser.id}`, { method: "DELETE" })
    .then(checkHttpStatus)
    .catch((error) => console.error(error))
    .then(dispatch(refreshUser()));
};
function checkHttpStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
  }
}
export const sendDeleteSelectedUserRequest = (users) => (dispatch) => {
  users.forEach((element) => {
    fetch(`http://localhost:3005/users/${element.id}`, { method: "DELETE" })
      .then(checkHttpStatus)
      .catch((error) => console.error(error));
  })
  setTimeout(dispatch(refreshUser()),400);
};

// This is called once we've added the car. As you can see in addCar(),
// when the POST is done, we then can get the latest list of cars from
// the server.
export const refreshUser = () => {
  return (dispatch) => {
    fetch(`http://localhost:3005/users`)
      .then(checkHttpStatus)
      .then((res) => res.json())
      .then((data) => dispatch(refresh(data)))
      .catch((error) => console.error(error));
  };
};
