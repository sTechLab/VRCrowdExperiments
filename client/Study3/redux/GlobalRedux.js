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
  | 'CharacterIntro1'
  | 'CharacterIntro2'
  | 'AvatarEditor'
  | 'AvatarDialog1'
  | 'AvatarDialog2'
  | 'Game1'
  | 'Game2'
  | 'Exit';

export class GlobalState extends Record({
  appStep: 'Welcome',
  headsetStatus: false, // true in headset, false not in
  homeImage: 'home.jpg',
  hasHomeImage: true,
  avatar_order: [],
  homeImageRotation: 20,
}) {
  appStep: AppStepType;
  headsetStatus: boolean;
  homeImage: string;
  hasHomeImage: boolean;
  avatar_order: Array<number>;
  homeImageRotation: number;
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
    }
  | {
      type: 'SET_HOME_IMAGE',
      homeImage: string,
      hasHomeImage: boolean,
      homeImageRotation: number,
    }
  | {
      type: 'ASSIGN_ORDER',
      avatar_order: Array<number>,
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
    case 'SET_HOME_IMAGE':
      return state
        .set('homeImage', action.homeImage)
        .set('hasHomeImage', action.hasHomeImage)
        .set('homeImageRotation', action.homeImageRotation);
    case 'ASSIGN_ORDER':
      return state.set('avatar_order', action.avatar_order);

    default:
      return state;
  }
};
