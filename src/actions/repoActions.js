import { 
  GET_REPOSITORIES, 
  GET_REPOSITORY, 
  SELECT_REPOSITORY 
} from "./actionTypes";

export const getRepositoryList = () => {
  return {
    type : GET_REPOSITORIES,
    payload : ""
  };
};

export const getRepositoryDetails = (repositoryName) => {
  return {
    type : GET_REPOSITORY,
    payload : repositoryName
  };
};

export const selectRepository = (repositoryName) => {
  return {
    type : SELECT_REPOSITORY,
    payload : repositoryName
  };
};