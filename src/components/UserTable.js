import { useState, useMemo } from "react";

import UserRow from "./UserRow.js";
import UserEditRow from "./UserEditRow.js";

function UserTable({ userList, onSaveHandler: onSave, onDeleteHandler,onCheckedHandler, onTriggerDeleteSelected }) {
  //userList.sort((a, b) => (a.id > b.id) ? 1 : -1);
  const { items, requestSort, sortConfig } = useSortableData(userList);

  let [editId, setEditId] = useState(-1);
  const [sortedField, setSortedField] = useState(null);

  function onEditHandler(id) {
    console.log("onEditHandler for " + id);
    setEditId(id);
  }

  function onSaveHandler(user) {
    onSave(user);
    setEditId(-1);
  }

  function onCancelHandler() {
    setEditId(-1);
  }

  return (
    <table>
      <thead>
        <tr key="header">
          <th>id</th>
          <th>
            <button type="button" onClick={() => requestSort("firstName")}>
              firstName
            </button>
          </th>
          <th>
            <button type="button" onClick={() => requestSort("lastName")}>
              lastName
            </button>
          </th>
          <th>
            <button type="button" onClick={() => requestSort("address")}>
              address
            </button>
          </th>
          <th>
            <button type="button" onClick={() => requestSort("city")}>
              city
            </button>
          </th>
          <th>
            <button type="button" onClick={() => requestSort("firstName")}>
              firstName
            </button>
          </th>
          <th>
            <button type="button" onClick={() => requestSort("email")}>
              email
            </button>
          </th>
          <th>
            <button type="button" onClick={() => requestSort("phone")}>
              phone
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <div>
        {items.map((user) => {
          return editId != user.id ? (
            <UserRow
              user={user}
              onEditHandler={onEditHandler}
              onDeleteHandler={onDeleteHandler}
              onCheckedHandler={onCheckedHandler}
            />
          ) : (
            <UserEditRow
              user={user}
              onSaveHandler={onSaveHandler}
              onCancelHandler={onCancelHandler}
            />
          );
        })}
            <button onClick={onTriggerDeleteSelected}>delete selected users</button>
            </div> 
      </tbody>
    </table>
  );
}

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export default UserTable;
