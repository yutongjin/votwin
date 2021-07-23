import "./styles.css";
import Button from "@material-ui/core/Button";

let UserRow = ({ user, onEditHandler, onDeleteHandler, onCheckedHandler }) => {
  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.address}</td>
      <td>{user.city}</td>
      <td>{user.birthday}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        <input
          type="checkbox"
          defaultChecked={user.checked}
          onChange={() => {
            onCheckedHandler(user);
          }}
        />
      </td>
      <td>
        <Button
          variant="contained"
          color="blue"
          type="button"
          style={{marginRight:10}}
          onClick={() => onEditHandler(user.id)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="blue"
          type="button"
          onClick={() => onDeleteHandler(user)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default UserRow;
