import {fork, put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";
import { GET_REPOSITORIES, GET_REPOSITORIES_SUCCESS, GET_REPOSITORIES_ERROR } from "../actions/actionTypes";
import AplClient from "../Utilities/apollo";
import { getRepositories } from "../Utilities/apoloQueries";

function retrieveRepositories(){
  return axios.request({
    method: "get",
    url: "https://api.github.com/user/69631/repos?page=2"
  });
}

export function* getRepositoriesList() {
  try {
    // const result = yield AplClient.getClient()
    //   .query({ query: getRepositories });
    // yield put(
    //   {
    //     type: GET_REPOSITORIES_SUCCESS,
    //     payload: result
    //   }
    // );
    let result = yield call(retrieveRepositories);

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

/**
 * Fires the saga for GET_PROVIDERTYPE_LIST action
 */
export function* watchGetRepositories() {
  yield takeEvery(GET_REPOSITORIES, getRepositoriesList);
}

export const repoSagas = [ fork(watchGetRepositories) ];
