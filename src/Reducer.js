import {
  ADD_USER,
  SAVE_USER,
  REFRESH,
  CHECK_USER,
  DELETE_USER,
  DELETE_SELECTED_USER,
  DONE_WITH_REQUEST,
  REQUEST_FETCHING,
} from "./actions/userActions";

let initialState = {
  users: [],
  isFetching: false,
  doneWithRequest: false,
};
export function reducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH: {
      return {
        users: action.data,
        isFetching: false,
        doneWithRequest: false,
      };
    }
    case REQUEST_FETCHING: {
      return {
        ...state,
        isFetching: true,
        doneWithRequest: false,
      };
    }
    case DONE_WITH_REQUEST: {
      return {
        ...state,
        doneWithRequest: true,
        isFetching: false,
      };
    }

    default:
      return state;
  }
}
