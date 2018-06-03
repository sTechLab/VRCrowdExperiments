/**
 * TrackingSessionRedux
 *
 * @flow
 * @format
 */

'use strict';

// $FlowFixMe
import {List, Record} from 'immutable';
import type {Reducer} from 'redux';

export const SESSION_TIMELIMIT = 180;
export const HEADMODELBATCH_SIZE = 30; // hold only one batch of headmodels at one time, when it's full, send to server and clear
export const FRAME_RATE = 5;

export class TrackingSessionState extends Record({
  remainingSec: SESSION_TIMELIMIT,
  sessionEnded: false,
  poses: [],
  locations: [],
  caught_fox: false,
  orientations: '',
}) {
  remainingSec: number;
  sessionEnded: boolean;
  poses: Array<any>;
  locations: Array<any>;
  caught_fox: boolean;
  orientations: Array<string>;
}

export type TrackingSessionActions =
  | {
      type: 'INIT_SESSION',
    }
  | {
      type: 'COUNTDOWN',
    }
  | {
      type: 'SET_AVATAR_CONDITIONS',
      poses: Array<any>,
      locations: Array<any>,
      orientations: Array<string>,
    }
  | {
      type: 'CATCH_FOX',
    };

// Reducer
export const TrackingSessionReducer: Reducer<
  TrackingSessionState,
  TrackingSessionActions,
> = (
  state: TrackingSessionState = new TrackingSessionState(),
  action: TrackingSessionActions,
) => {
  switch (action.type) {
    case 'INIT_SESSION':
      return state
        .set('remainingSec', SESSION_TIMELIMIT)
        .set('sessionEnded', false);
    case 'COUNTDOWN':
      let newState = state.set(
        'remainingSec',
        Math.max(state.remainingSec - 1, 0),
      );
      if (newState.remainingSec === 0) {
        newState = newState.set('sessionEnded', true);
      }
      return newState;
    case 'SET_AVATAR_CONDITIONS':
      return state
        .set('poses', action.poses)
        .set('locations', action.locations)
        .set('orientations', action.orientations);
    case 'CATCH_FOX':
      return state.set('caught_fox', true);
    default:
      return state;
  }
};
