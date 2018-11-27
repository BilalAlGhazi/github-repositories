import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import rootSagas from "./rootSagas";
import appReducers from "../reducers";

let middlewares = [];

// Push the saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // Add redux logger in development mode
  middlewares.push(logger);
} 

export const store = createStore(
  appReducers,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSagas);