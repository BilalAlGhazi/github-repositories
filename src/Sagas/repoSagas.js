import {fork, put, takeEvery, take, call } from "redux-saga/effects";
import axios from "axios";
import parse from "parse-link-header";
import { 
  GET_REPOSITORIES, 
  GET_REPOSITORIES_SUCCESS, 
  GET_REPOSITORIES_ERROR,
  GET_CONTRIBUTORS_SUCCESS,
  GET_CONTRIBUTORS_ERROR,
  SELECT_REPOSITORY,
  LOAD_MORE_CONTRIBUTORS,
  LOAD_MORE_CONTRIBUTORS_SUCCESS,
  LOAD_MORE_CONTRIBUTORS_ERROR
} from "../actions/actionTypes";
import AplClient from "../Utilities/apollo";
import { getRepositories } from "../Utilities/apoloQueries";

function retrieveRepositories(){
  return axios.request({
    method: "get",
    url: "https://api.github.com/user/69631/repos"
  });
}

function retrieveRepositoryContributors(repositoryName){
  return axios.request({
    method: "get",
    url: `https://api.github.com/repos/facebook/${repositoryName}/contributors`
  });
}

function retrieveMoreRepositoryContributors(nextPageUrl){
  return axios.request({
    method: "get",
    url: nextPageUrl
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

export function* getRepositoryContributors(action){
  try {
    const result = yield call(retrieveRepositoryContributors, [action.payload]);
    console.log(result);
    // Check if the result is complete
    let hasMoreResults = false;
    let nextPageUrl = "";
    if (result && result.headers && result.headers.link){
      const parsed = parse(result.headers.link);
      if (parsed.next){
        hasMoreResults = true;
        nextPageUrl = parsed.next.url;
      }
    }
    yield put(
      {
        type: GET_CONTRIBUTORS_SUCCESS,
        payload: {
          data: result.data, 
          hasMoreResults: hasMoreResults, 
          nextPageUrl: nextPageUrl
        }
      }
    );
  } catch (error) {
    yield put(
      {
        type: GET_CONTRIBUTORS_ERROR,
        payload: error
      }
    );
  }
}

export function* loadMoreContributors(action){
  try {
    const result = yield call(retrieveMoreRepositoryContributors, [action.payload]);
    // Check if the result is complete
    let hasMoreResults = false;
    let nextPageUrl = "";
    if (result && result.headers && result.headers.link){
      const parsed = parse(result.headers.link);
      if (parsed.next){
        hasMoreResults = true;
        nextPageUrl = parsed.next.url;
      }
    }
    yield put(
      {
        type: LOAD_MORE_CONTRIBUTORS_SUCCESS,
        payload: {
          data: result.data, 
          hasMoreResults: hasMoreResults, 
          nextPageUrl: nextPageUrl
        }
      }
    );
  } catch (error) {
    yield put(
      {
        type: LOAD_MORE_CONTRIBUTORS_ERROR,
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
export function* watchGetRepositoryContributors() {
  yield takeEvery(SELECT_REPOSITORY, getRepositoryContributors);
}

/**
 * Fires the saga for LOAD_MORE_CONTRIBUTORS action
 */
export function* watchLoadMoreContributors() {
  yield takeEvery(LOAD_MORE_CONTRIBUTORS, loadMoreContributors);
}

export const repoSagas = [ 
  fork(watchGetRepositories), 
  fork(watchGetRepositoryContributors), 
  fork(watchLoadMoreContributors) 
];
