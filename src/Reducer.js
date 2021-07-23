import {
  ADD_USER,
  SAVE_USER,
  REFRESH,
  CHECK_USER,
  DELETE_USER,
  DELETE_SELECTED_USER,
} from "./actions/userActions";
import { REFRESH_VOTES_LIST, REFRESH_QUESTIONS_LIST } from './actions/votesActions.js'

let initialState = {
  users: [],
  electionList: [],
  election: {
    "id": 0,
    "electionTitle": "Loading",
    "questions": []
  }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH: {
      return {
        ...state,
        users: action.data,
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

    default:
      return state;
  }
}
