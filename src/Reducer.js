import {
  ADD_USER,
  SAVE_USER,
  REFRESH,
  CHECK_USER,
  DELETE_USER,
  DELETE_SELECTED_USER,
} from "./actions/userActions";

let initialState = {
  users: [],
};
export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      const nextId =
        state?.users.sort((a, b) => (a.id > b.id ? -1 : 1))[0]?.id + 1;

      return {
        users: [
          ...state.users,
          {
            id: nextId ? nextId : 0,
            ...action.user,
          },
        ],
      };
    }
    case SAVE_USER: {
      return {
        users: state.users.map((user) => {
          return user.id === action.user.id ? action.user : user;
        }),
      };
    }
    case REFRESH: {
      return {
        users: action.data,
      };
    }
    case CHECK_USER: {
      console.log(action.user.id);
      return {
        users: state.users.map((user) => {
          return user.id === action.user.id
            ? {
                ...user,
                checked: !user.checked,
              }
            : user;
        }),
      };
    }
    case DELETE_USER: {
      return {
        users: state.users.filter((user) => user.id !== action.user.id),
      };
    }
    case DELETE_SELECTED_USER: {
      return {
        users: state.users.filter((user) => !user.checked),
      };
    }

    default:
      return state;
  }
}
