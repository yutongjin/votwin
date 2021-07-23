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
import { REFRESH_VOTES_LIST, REFRESH_QUESTIONS_LIST } from './actions/votesActions.js'

let initialState = {
  users: [],
  electionList: [],
  election: {
    "id": 0,
    "electionTitle": "Loading",
    "questions": []
  },
  isFetching: false,
  doneWithRequest: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH: {
      return {
        ...state,
        users: action.data,
        isFetching: false,
        doneWithRequest: false,
      };
    }

    case REFRESH_VOTES_LIST: {
      return {
        ...state,
        electionList: action.data,
      }
    }

    case REFRESH_QUESTIONS_LIST: {
      return {
        ...state,
        election: action.data,
      }
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
