import './styles.css';

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
        <input
          type="button"
          value="Edit"
          onClick={() => onEditHandler(user.id)}
        />
        <input
          type="button"
          value="Delete"
          onClick={() => onDeleteHandler(user)}
        />
      </td>
    </tr>
  );
};

export default UserRow;
