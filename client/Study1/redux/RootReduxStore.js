/**
 * RootReduxStore
 *
 * @flow
 * @format
 */

'use strict';

import type {GlobalActions, GlobalState} from './GlobalRedux';
import type {LoggerActions, LoggerState} from '../../redux/LoggerRedux';
import type {Store} from 'redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';

import {GlobalReducer} from './GlobalRedux';
import {LoggerReducer} from '../../redux/LoggerRedux';
import thunk from 'redux-thunk';

export type AppState = {
  global: GlobalState,
  logger: LoggerState,
};

export type KnownActions = GlobalActions | LoggerActions;

export const reducers = {
  global: GlobalReducer,
  logger: LoggerReducer,
};

function configureStore() {
  const createStoreWithMiddleware = compose(applyMiddleware(thunk))(
    createStore,
  );

  // Combine all reducers and instantiate the app-wide store instance
  const allReducers = combineReducers(reducers);
  return createStoreWithMiddleware(allReducers);
}

export default configureStore();
