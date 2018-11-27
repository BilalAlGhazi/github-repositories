import { 
  GET_REPOSITORIES, 
  GET_CONTRIBUTORS, 
  SELECT_REPOSITORY,
  LOAD_MORE_CONTRIBUTORS
} from "./actionTypes";

export const getRepositoryList = () => {
  return {
    type : GET_REPOSITORIES,
    payload : ""
  };
};

export const getRepositoryContributors = (repositoryName) => {
  return {
    type : GET_CONTRIBUTORS,
    payload : repositoryName
  };
};

export const loadMoreContributors = (nextUrl) => {
  return {
    type : LOAD_MORE_CONTRIBUTORS,
    payload : nextUrl
  };
};

export const selectRepository = (repositoryName) => {
  return {
    type : SELECT_REPOSITORY,
    payload : repositoryName
  };
};