import {fork, put, takeEvery } from "redux-saga/effects";
import { GET_REPOSITORIES } from "../actions/actionTypes";

export function* getRepositoriesList() {
  try {
    // //make code changes relevant to mapping
    // const providerTypeList = providerTypes;
    // yield put(loadProviderTypeList(providerTypeList));
  } catch (error) {
    //No Error as we are loading from mock json for now.
    //In Future it will be decided from where we need to get the provider types
  }
}

/**
 * Fires the saga for GET_PROVIDERTYPE_LIST action
 */
export function* watchGetRepositories() {
  yield takeEvery(GET_REPOSITORIES, getRepositoriesList);
}

export const repoSagas = [ fork(watchGetRepositories) ];
