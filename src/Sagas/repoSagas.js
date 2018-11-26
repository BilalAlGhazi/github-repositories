import {fork, put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";
import { 
  GET_REPOSITORIES, 
  GET_REPOSITORIES_SUCCESS, 
  GET_REPOSITORIES_ERROR,
  GET_REPOSITORY,
  GET_REPOSITORY_SUCCESS,
  GET_REPOSITORY_ERROR
} from "../actions/actionTypes";
import AplClient from "../Utilities/apollo";
import { getRepositories } from "../Utilities/apoloQueries";

function retrieveRepositories(){
  return axios.request({
    method: "get",
    url: "https://api.github.com/user/69631/repos"
  });
}

function retrieveRepositoryDetails(repositoryName){
  return axios.request({
    method: "get",
    url: `https://api.github.com/repos/facebook/${repositoryName}`
  });
}

export function* getRepositoriesList() {
  try {
    const result = yield call(retrieveRepositories);
    yield put(
      {
        type: GET_REPOSITORIES_SUCCESS,
        payload: result.data
      }
    );
  } catch (error) {
    yield put(
      {
        type: GET_REPOSITORIES_ERROR,
        payload: error
      }
    );
  }
}

export function* getRepositoryDetails(action){
  try {
    const result = yield call(retrieveRepositoryDetails, [action.payload]);
    console.log(result);
    yield put(
      {
        type: GET_REPOSITORY_SUCCESS,
        payload: result.data
      }
    );
  } catch (error) {
    yield put(
      {
        type: GET_REPOSITORY_ERROR,
        payload: error
      }
    );
  }
}

/**
 * Fires the saga for GET_REPOSITORIES action
 */
export function* watchGetRepositories() {
  yield takeEvery(GET_REPOSITORIES, getRepositoriesList);
}

/**
 * Fires the saga for GET_REPOSITORY action
 */
export function* watchGetRepositoryDetails() {
  yield takeEvery(GET_REPOSITORY, getRepositoryDetails);
}

export const repoSagas = [ fork(watchGetRepositories), fork(watchGetRepositoryDetails) ];
