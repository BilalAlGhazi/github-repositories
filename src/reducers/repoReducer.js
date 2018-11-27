import _ from "lodash";
import { 
  GET_REPOSITORIES_SUCCESS, 
  GET_REPOSITORY_SUCCESS,
  SELECT_REPOSITORY
} from "../actions/actionTypes";

const initialState = {
  repositoriesList: [],
  selectedRepository: {}
};

export const repoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPOSITORIES_SUCCESS:
      return { ...state, repositoriesList: action.payload };
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