import _ from "lodash";
import { 
  GET_REPOSITORIES_SUCCESS, 
  SELECT_REPOSITORY,
  LOAD_MORE_REPOSITORIES_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  repositoriesList: [],
  selectedRepository: {}
};

export const repoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPOSITORIES_SUCCESS:
      return { 
        ...state, 
        repositoriesList: action.payload.data.items,
        hasMoreResults: action.payload.hasMoreResults,
        nextPageUrl: action.payload.nextPageUrl
      };
    case LOAD_MORE_REPOSITORIES_SUCCESS:
      return { 
        ...state, 
        repositoriesList: state.repositoriesList.concat(action.payload.data.items),
        hasMoreResults: action.payload.hasMoreResults,
        nextPageUrl: action.payload.nextPageUrl
      }; 
    case SELECT_REPOSITORY: 
      const repositoryObj = _.find(state.repositoriesList, {"name": action.payload});
      return {
        ...state,
        selectedRepository: repositoryObj
      };
    default:
      return state
  }
} 