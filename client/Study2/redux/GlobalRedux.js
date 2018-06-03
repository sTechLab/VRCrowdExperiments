/**
 * Global Store
 *
 * @flow
 * @format
 */

'use strict';

// $FlowFixMe
import {Record} from 'immutable';
import type {Reducer} from 'redux';

export type AppStepType = 'Welcome' | 'Instructions' | 'Tracking' | 'Exit';

export class GlobalState extends Record({
  appStep: 'Welcome',
  homeImage: 'home.jpg',
  hasHomeImage: true,
  panoImage: 'plaza1.jpg',
  headsetStatus: false,
  allUserInputs: {}, // to hold all key values for logging, not optimal
}) {
  appStep: AppStepType;
  homeImage: string;
  hasHomeImage: boolean;
  panoImage: string;
  headsetStatus: boolean;
  allUserInputs: Object;
}

export type GlobalActions =
  | {
      type: 'CHANGE_APP_STEP',
      appStep: AppStepType,
    }
  | {
      type: 'CHANGE_3D_SCENE',
      appStep: AppStepType,
      hasHomeImage: boolean,
    }
  | {
      type: 'CHANGE_HEADSETSTATUS',
      headsetStatus: boolean,
    }
  | {
      type: 'PUSH_USER_INPUT',
      key: string,
      value: any,
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
    case 'PUSH_USER_INPUT':
      state.set(
        'allUserInputs',
        (state.allUserInputs[action.key] = action.value),
      );
    default:
      return state;
  }
};
