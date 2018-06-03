/**
 * RootReduxStore
 *
 * @flow
 * @format
 */

'use strict';

import type {GlobalActions, GlobalState} from './GlobalRedux';
import type {LoggerActions, LoggerState} from '../../redux/LoggerRedux';
import type {
  TrackingSessionActions,
  TrackingSessionState,
} from './TrackingSessionRedux';

import type {Store} from 'redux';

import {applyMiddleware, combineReducers, compose, createStore} from 'redux';

import {GlobalReducer} from './GlobalRedux';
import {LoggerReducer} from '../../redux/LoggerRedux';
import {TrackingSessionReducer} from './TrackingSessionRedux';

import thunk from 'redux-thunk';

export type AppState = {
  global: GlobalState,
  logger: LoggerState,
  trackingSession: TrackingSessionState,
};

export type KnownActions =
  | GlobalActions
  | LoggerActions
  | TrackingSessionActions;

export const reducers = {
  global: GlobalReducer,
  logger: LoggerReducer,
  trackingSession: TrackingSessionReducer,
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
