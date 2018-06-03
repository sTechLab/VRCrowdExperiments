/**
 * RootReduxStore
 *
 * @flow
 * @format
 */

'use strict';

import type {GlobalActions, GlobalState} from './GlobalRedux';
import type {LoggerActions, LoggerState} from '../../redux/LoggerRedux';
import type {InputActions, InputState} from '../../redux/InputRedux';
import type {GameActions, GameState} from './GameRedux';
import type {Store} from 'redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';

import {GlobalReducer} from './GlobalRedux';
import {LoggerReducer} from '../../redux/LoggerRedux';
import {InputReducer} from '../../redux/InputRedux';
import {GameReducer} from './GameRedux';
import thunk from 'redux-thunk';

export type AppState = {
  global: GlobalState,
  logger: LoggerState,
  input: InputState,
  game: GameState,
};

export type KnownActions =
  | GlobalActions
  | LoggerActions
  | InputActions
  | GameActions;

export const reducers = {
  global: GlobalReducer,
  logger: LoggerReducer,
  input: InputReducer,
  game: GameReducer,
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
