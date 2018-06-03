/**
 * Input Redux Store
 *
 * @flow
 * @format
 */

'use strict';

// $FlowFixMe
import {Record} from 'immutable';
import type {Reducer} from 'redux';

export type InputFields = 'split1' | 'split2' | 'split3' | 'split4';
export type ARFields = 'ar1' | 'ar2' | 'ar3' | 'ar4'; // accept or reject values

export class InputState extends Record({
  split1: '',
  split2: '',
  split3: '',
  split4: '',
  ar1: null,
  ar2: null,
  ar3: null,
  ar4: null,
}) {
  split1: string;
  split2: string;
  split3: string;
  split4: string;
  ar1: boolean;
  ar2: boolean;
  ar3: boolean;
  ar4: boolean;
}

export type InputActions =
  | {
      type: 'CHANGE_INPUT_VALUE',
      target: InputFields,
      value: string,
    }
  | {
      type: 'APPEND_INPUT_VALUE',
      target: InputFields,
      value: string,
    }
  | {
      type: 'BACKSPACE',
      target: InputFields,
    }
  | {
      type: 'SET_AR_VALUE',
      target: ARFields,
      value: boolean,
    };

export const InputReducer: Reducer<InputState, InputActions> = (
  state: InputState = new InputState(),
  action: InputActions,
) => {
  switch (action.type) {
    case 'CHANGE_INPUT_VALUE':
      return state.set(action.target, action.value);
    case 'APPEND_INPUT_VALUE':
      return state.set(action.target, state[action.target] + action.value);
    case 'BACKSPACE':
      return state.set(
        action.target,
        state[action.target].slice(0, state[action.target].length - 1),
      );
    case 'SET_AR_VALUE':
      return state.set(action.target, action.value);

    default:
      return state;
  }
};
