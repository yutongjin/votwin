import { useState } from "react";

function UserForm({ onAddHandler }) {
  const [isRegistered, setIsRegistered] = useState(false);
  let emptyUserForm = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    birthday: "",
    email: "",
    phone: "",
    checked: false,
    voted: false,
  };
  let [userForm, setUserForm] = useState(emptyUserForm);

  function onChange(e) {
    const newUserForm = {
      ...userForm,
      [e.target.name]: e.target.value,
    };
    console.log(newUserForm);
    setUserForm(newUserForm);
  }

  function onFormSubmit() {
    onAddHandler(userForm);
    setUserForm(emptyUserForm);
    setIsRegistered(true);
    alert("register succesfully!");
  }

  return !isRegistered ? (
    <form>
      <p>Enter your firstName:</p>
      <input
        type="text"
        name="firstName"
        value={userForm.firstName}
        onChange={onChange}
      />{" "}
      &nbsp;
      <p>Enter your lastName:</p>
      <input
        type="text"
        name="lastName"
        value={userForm.lastName}
        onChange={onChange}
      />{" "}
      &nbsp;
      <p>Enter your address:</p>
      <input
        type="text"
        name="address"
        value={userForm.address}
        onChange={onChange}
      />{" "}
      &nbsp;
      <p>Enter your city:</p>
      <input
        type="text"
        name="city"
        value={userForm.city}
        onChange={onChange}
      />{" "}
      &nbsp;
      <p>Enter your birthday:</p>
      <input
        type="text"
        name="birthday"
        value={userForm.birthday}
        onChange={onChange}
      />{" "}
      &nbsp;
      <p>Enter your email:</p>
      <input
        type="text"
        name="email"
        value={userForm.email}
        onChange={onChange}
      />{" "}
      &nbsp;
      <p>Enter your phone:</p>
      <input
        type="text"
        name="phone"
        value={userForm.phone}
        onChange={onChange}
      />{" "}
      &nbsp;
      <input type="button" value="register" onClick={onFormSubmit} />
    </form>
  ) : (
    <div></div>
  );
}

export default UserForm;
