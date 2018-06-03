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
import {RESPONSE_LOOKUP_TABLE} from '../Configs';

export class GameState extends Record({
  gamePage: 0,
  myScore: 0,
  oppScore: 0,
  response: '',
  result: '',
  avatar_idx: null,
  allUserInputs: {},
}) {
  gamePage: number;
  myScore: number;
  oppScore: number;
  response: string;
  result: string;
  avatar_idx: string;
  allUserInputs: Object;
}

export type GameActions =
  | {
      type: 'RESET_GAME_PAGE',
    }
  | {
      type: 'INCREMENT_GAME_PAGE',
    }
  | {
      type: 'RESET_SCORES',
    }
  | {
      type: 'SET_AVATAR_IDX',
      avatar_idx: number,
    }
  | {
      type: 'PUSH_USER_INPUT',
      key: string,
      value: any,
    };

function updateResponse(state: GameState): GameState {
  if ([1, 3, 5, 7].includes(state.gamePage)) {
    let page = state.gamePage;
    let avatar_idx = state.avatar_idx;
    let response =
      RESPONSE_LOOKUP_TABLE[page.toString()][avatar_idx.toString()];
    let temp;

    if ([1, 5].includes(page)) {
      if (parseInt(state.allUserInputs[response]) >= 10) {
        temp = 'accepted';
      } else {
        temp = 'rejected';
      }
    } else {
      if (state.allUserInputs[response]) {
        temp = 'accepted';
      } else {
        temp = 'rejected';
      }
    }
    return state.set('response', temp);
  } else return state;
}

function updateScores(state: GameState): GameState {
  let page = state.gamePage;
  if ([1, 3, 5, 7].includes(page)) {
    let field =
      RESPONSE_LOOKUP_TABLE[page.toString()][state.avatar_idx.toString()];
    let oppScore = 0;
    let myScore = 0;
    switch (page) {
      case 1:
        if (parseInt(state.allUserInputs[field]) >= 10) {
          oppScore = parseInt(state.allUserInputs[field]);
          myScore = 100 - oppScore;
        }
        break;
      case 3:
        if (state.allUserInputs[field]) {
          oppScore = 50;
          myScore = 50;
        }
        break;
      case 5:
        if (parseInt(state.allUserInputs[field]) >= 10) {
          oppScore = parseInt(state.allUserInputs[field]);
          myScore = 100 - oppScore;
        }
        break;
      case 7:
        if (state.allUserInputs[field]) {
          oppScore = 75;
          myScore = 25;
        }
        break;
    }
    return state
      .set('myScore', state.myScore + myScore)
      .set('oppScore', state.oppScore + oppScore);
  } else return state;
}

function updateGameResult(state: GameState): GameState {
  if (state.gamePage === 7) {
    let temp;
    if (state.myScore > state.oppScore) {
      temp = 'won';
    } else if (state.myScore < state.oppScore) {
      temp = 'lost';
    } else {
      temp = 'tie';
    }
    return state.set('result', temp);
  } else {
    return state;
  }
}

export const GameReducer: Reducer<GameState, GameActions> = (
  state: GameState = new GameState(),
  action: GameActions,
) => {
  switch (action.type) {
    case 'RESET_GAME_PAGE':
      return state.set('gamePage', 0);
    case 'INCREMENT_GAME_PAGE':
      return state.set('gamePage', state.gamePage + 1);
    case 'RESET_SCORES':
      return state.set('myScore', 0).set('oppScore', 0);
    case 'SET_AVATAR_IDX':
      return state.set('avatar_idx', action.avatar_idx);
    case 'PUSH_USER_INPUT':
      state.set(
        'allUserInputs',
        (state.allUserInputs[action.key] = action.value),
      );
      return updateGameResult(updateScores(updateResponse(state)));

    default:
      return state;
  }
};
