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
      }
  }
  return state
} 


// name, created_at, default_branch, description, forks_count, homepage, html_url, language, open_issues_count
// stargazers_count, subscribers_count, watchers_count
// https://api.github.com/repos/facebook/facebook-instant-articles-sdk-php/contributors