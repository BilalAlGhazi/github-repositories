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
  LOAD_MORE_CONTRIBUTORS_ERROR,
  LOAD_MORE_REPOSITORIES_SUCCESS,
  LOAD_MORE_REPOSITORIES
} from "../actions/actionTypes";

function retrieveRepositories(){
  return axios.request({
    method: "get",
    url: "https://api.github.com/search/repositories?q=user:facebook&sort=stars&order=desc"
  });
}

function retrieveMoreRepositories(nextPageUrl){
  return axios.request({
    method: "get",
    url: nextPageUrl
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

function* getRepositoriesList() {
  try {
    const result = yield call(retrieveRepositories);
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
        type: GET_REPOSITORIES_SUCCESS,
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
        type: GET_REPOSITORIES_ERROR,
        payload: error
      }
    );
  }
}

function* loadMoreRepositoriesList(action) {
  try {
    const result = yield call(retrieveMoreRepositories, [action.payload]);
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
        type: LOAD_MORE_REPOSITORIES_SUCCESS,
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
        type: GET_REPOSITORIES_ERROR,
        payload: error
      }
    );
  }
}

function* getRepositoryContributors(action){
  try {
    const result = yield call(retrieveRepositoryContributors, [action.payload]);
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

function* loadMoreContributors(action){
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
function* watchGetRepositories() {
  yield takeEvery(GET_REPOSITORIES, getRepositoriesList);
}

/**
 * Fires the saga for GET_REPOSITORY action
 */
function* watchGetRepositoryContributors() {
  yield takeEvery(SELECT_REPOSITORY, getRepositoryContributors);
}

/**
 * Fires the saga for LOAD_MORE_CONTRIBUTORS action
 */
function* watchLoadMoreContributors() {
  yield takeEvery(LOAD_MORE_CONTRIBUTORS, loadMoreContributors);
}

/**
 * Fires the saga for LOAD_MORE_REPOSITORIES action
 */
function* watchLoadMoreRepositories() {
  yield takeEvery(LOAD_MORE_REPOSITORIES, loadMoreRepositoriesList);
}

export const repoSagas = [ 
  fork(watchGetRepositories), 
  fork(watchGetRepositoryContributors), 
  fork(watchLoadMoreContributors),
  fork(watchLoadMoreRepositories)
];
