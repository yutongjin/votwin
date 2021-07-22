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
    case REFRESH: {
      return {
        users: action.data,
      };
    }
    default:
      return state;
  }
}
