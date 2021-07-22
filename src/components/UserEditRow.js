import { useState } from "react";

let UserEditRow = ({ user, onSaveHandler, onCancelHandler }) => {
  let [userRow, setUserRow] = useState(user);

  function onChange(e) {
    const newUserRow = {
      ...user,
      [e.target.name]: e.target.value,
    };
    console.log(newUserRow);
    setUserRow(newUserRow);
  }

  return (
    <tr key={userRow.id}>
      <td>{userRow.id}</td>
      <td>
        <input
          type="text"
          name="firstName"
          value={userRow.firstName}
          onChange={onChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="lastName"
          value={userRow.lastName}
          onChange={onChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="address"
          value={userRow.address}
          onChange={onChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="city"
          value={userRow.city}
          onChange={onChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="birthday"
          value={userRow.birthday}
          onChange={onChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="email"
          value={userRow.email}
          onChange={onChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="phone"
          value={userRow.phone}
          onChange={onChange}
        ></input>
      </td>
      <td>
        <input
          type="button"
          value="Save"
          onClick={() => onSaveHandler(userRow)}
        />
        <input type="button" value="Cancel" onClick={onCancelHandler} />
      </td>
    </tr>
  );
};

export default UserEditRow;
