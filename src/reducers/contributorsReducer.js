import _ from "lodash";
import { 
  GET_CONTRIBUTORS_SUCCESS, 
  GET_CONTRIBUTORS_ERROR,
  GET_CONTRIBUTORS,
  LOAD_MORE_CONTRIBUTORS_SUCCESS,
  LOAD_MORE_CONTRIBUTORS_ERROR
} from "../actions/actionTypes";

const initialState = {
  contributorsList: [],
  hasMoreResults: false,
  nextPageUrl: "",
  hasError: false
};

export const contributorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTRIBUTORS: 
      // Clear the current contrubitors
      return { ...state, contributorsList: [] };
    case GET_CONTRIBUTORS_SUCCESS:
      return { 
        ...state, 
        contributorsList: action.payload.data, 
        hasMoreResults: action.payload.hasMoreResults,
        nextPageUrl: action.payload.nextPageUrl
       };
    case LOAD_MORE_CONTRIBUTORS_SUCCESS:
      return { 
        ...state, 
        contributorsList: state.contributorsList.concat(action.payload.data), 
        hasMoreResults: action.payload.hasMoreResults,
        nextPageUrl: action.payload.nextPageUrl
      };
    case GET_CONTRIBUTORS_ERROR:
      return {
        ...state,
        hasError: true
      };
    case LOAD_MORE_CONTRIBUTORS_ERROR:
      return {
        ...state,
        hasError: true
      };
    default:
      return state
  }
}