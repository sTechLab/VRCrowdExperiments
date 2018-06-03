/**
 * Global
 *
 * @flow
 * @format
 */

'use strict';

// $FlowFixMe
import {Record} from 'immutable';
import type {Reducer} from 'redux';

export type AppStepType =
  | 'Welcome'
  | 'Instructions'
  | 'Video1'
  | 'Video2'
  | 'Exit';

export class GlobalState extends Record({
  appStep: 'Welcome',
  headsetStatus: false, // true in headset, false not in
  homeImage: 'home.jpg',
  hasHomeImage: true,
}) {
  appStep: AppStepType;
  headsetStatus: boolean;
  homeImage: string;
  hasHomeImage: boolean;
}

export type GlobalActions =
  | {
      type: 'CHANGE_APP_STEP',
      appStep: AppStepType,
    }
  | {
      type: 'CHANGE_3D_SCENE',
      hasHomeImage: boolean,
      appStep: AppStepType,
    }
  | {
      type: 'CHANGE_HEADSETSTATUS',
      headsetStatus: boolean,
    };

export const GlobalReducer: Reducer<GlobalState, GlobalActions> = (
  state: GlobalState = new GlobalState(),
  action: GlobalActions,
) => {
  switch (action.type) {
    case 'CHANGE_APP_STEP':
      return state.set('appStep', action.appStep);
    case 'CHANGE_3D_SCENE':
      return state
        .set('appStep', action.appStep)
        .set('hasHomeImage', action.hasHomeImage);
    case 'CHANGE_HEADSETSTATUS':
      return state.set('headsetStatus', action.headsetStatus);

    default:
      return state;
  }
};
