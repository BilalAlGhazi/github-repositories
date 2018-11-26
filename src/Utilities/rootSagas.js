import { all } from "redux-saga/effects";
import { repoSagas } from "../Sagas/repoSagas";

export default function* rootSaga() {
  yield all([
    ...repoSagas
  ]);
}
