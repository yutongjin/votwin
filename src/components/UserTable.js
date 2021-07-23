import { useState, useMemo } from "react";
import "./styles.css";
import Button from '@material-ui/core/Button';

import UserRow from "./UserRow.js";
import UserEditRow from "./UserEditRow.js";
function UserTable({
  userList,
  onSaveHandler: onSave,
  onDeleteHandler,
  onCheckedHandler,
  onTriggerDeleteSelected,
}) {
  //userList.sort((a, b) => (a.id > b.id) ? 1 : -1);
  const { items, requestSort, sortConfig } = useSortableData(userList);
  const [isExpanded, setIsExpanded] = useState(false);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
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
    <div>
      {/* <Button variant="contained" color="blue" component="span" onClick={() => setIsExpanded(!isExpanded)}>UserList</Button> */}
      
        <table >
          <thead>
            <tr key="header">
              <th>
                <Button variant="contained" color="blue" 
                  type="button"
                  onClick={() => requestSort("id")}
                  className={getClassNamesFor("id")}
                >
                  id
                </Button>
              </th>
              <th>
                <Button variant="contained" color="blue" 
                  type="button"
                  onClick={() => requestSort("firstName")}
                  className={getClassNamesFor("firstName")}
                >
                  firstName
                </Button>
              </th>
              <th>
                <Button variant="contained" color="blue" 
                  type="button"
                  onClick={() => requestSort("lastName")}
                  className={getClassNamesFor("lastName")}
                >
                  lastName
                </Button>
              </th>
              <th>
                <Button variant="contained" color="blue" 
                  type="button"
                  onClick={() => requestSort("address")}
                  className={getClassNamesFor("address")}
                >
                  address
                </Button>
              </th>
              <th>
                <Button variant="contained" color="blue" 
                  type="button"
                  onClick={() => requestSort("city")}
                  className={getClassNamesFor("city")}
                >
                  city
                </Button>
              </th>
              <th>
                <Button variant="contained" color="blue" 
                  type="button"
                  onClick={() => requestSort("birthday")}
                  className={getClassNamesFor("birthday")}
                >
                  birthday
                </Button>
              </th>
              <th>
                <Button variant="contained" color="blue" 
                  type="button"
                  onClick={() => requestSort("email")}
                  className={getClassNamesFor("email")}
                >
                  email
                </Button>
              </th>
              <th>
                <Button variant="contained" color="blue" 
                  type="button"
                  onClick={() => requestSort("phone")}
                  className={getClassNamesFor("phone")}
                >
                  phone
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            
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
         
           
          </tbody>
        </table>
        <div className="center">
        <Button variant="contained" color="blue"  onClick={onTriggerDeleteSelected}>
                delete selected users
        </Button>
        </div>
    </div>
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
