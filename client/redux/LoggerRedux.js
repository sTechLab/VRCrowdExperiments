/**
 * LoggingRedux
 *
 * @flow
 * @format
 */

'use strict';

// $FlowFixMe
import {List, Record} from 'immutable';
import type {Reducer} from 'redux';
import ExperimentConfig from '../ExperimentConfig';
import type {
  ExperimentInfo,
  VRStatus,
  VRStatuses,
  TimeLog,
  TimeLogs,
  HeadModel,
  HeadModelBatch,
  UserInput,
  UserInputs,
} from '../utils/DataTypes';
import {
  saveExperimentInfo,
  saveVRStatuses,
  saveTimeLogs,
  saveHeadModelBatch,
  saveUserInputs,
} from '../utils/Api';

export class LoggerState extends Record({
  userID: '',
  condition: '', //true if in experiment group, false in control
  timeLogs: [],
  vrStatuses: [],
}) {
  userID: string;
  condition: string;
  timeLogs: Array<TimeLog>;
  vrStatuses: Array<VRStatus>;
}

export type LoggerActions =
  | {
      type: 'ASSIGN_USERID',
      userID: string,
    }
  | {
      type: 'ASSIGN_CONDITION',
      condition: string,
    }
  | {
      type: 'SAVE_EXPERIMENTINFO',
      experimentInfo: ExperimentInfo,
    }
  | {
      type: 'APPEND_VRSTATUS',
      vrStatus: VRStatus,
    }
  | {
      type: 'SAVE_VRSTATUSES',
      vrStatuses: VRStatuses,
    }
  | {
      type: 'APPEND_TIMELOG',
      timeLog: TimeLog,
    }
  | {
      type: 'SAVE_TIMELOGS',
      timeLogs: TimeLogs,
    }
  | {
      type: 'SAVE_HEADMODELBATCH',
      headModels: Array<HeadModel>,
    }
  | {
      type: 'SAVE_USERINPUTS',
      allUserInputs: Array<UserInput>,
    };

// helper functions to contruct the object types for logging
function getExperimentInfo(state: LoggerState): ExperimentInfo {
  let experimentInfo: ExperimentInfo = {
    userID: state.userID,
    condition: state.condition,
    studyName: ExperimentConfig.name,
  };
  return experimentInfo;
}

function getVRStatuses(state: LoggerState): VRStatuses {
  let vrStatuses: VRStatuses = {
    userID: state.userID,
    vrStatuses: state.vrStatuses,
  };
  return vrStatuses;
}

function getTimeLogs(state: LoggerState): TimeLogs {
  let timeLogs: TimeLogs = {
    userID: state.userID,
    timeLogs: state.timeLogs,
  };
  return timeLogs;
}

function getHeadModelBatch(
  state: LoggerState,
  headModels: Array<HeadModel>,
): HeadModelBatch {
  let headModelBatch: HeadModelBatch = {
    userID: state.userID,
    headModels: headModels,
  };
  return headModelBatch;
}

function getUserInputs(
  state: LoggerState,
  allUserInputs: Array<UserInput>,
): UserInputs {
  let userInputs: UserInputs = {
    userID: state.userID,
    userInputs: allUserInputs,
  };
  return userInputs;
}

// Reducer
export const LoggerReducer: Reducer<LoggerState, LoggerActions> = (
  state: LoggerState = new LoggerState(),
  action: LoggerActions,
) => {
  switch (action.type) {
    case 'ASSIGN_USERID':
      return state.set('userID', action.userID);
    case 'ASSIGN_CONDITION':
      return state.set('condition', action.condition);
    case 'SAVE_EXPERIMENTINFO':
      saveExperimentInfo(getExperimentInfo(state));
      return state;
    case 'APPEND_VRSTATUS':
      return state.set('vrStatuses', [...state.vrStatuses, action.vrStatus]);
    case 'SAVE_VRSTATUSES':
      saveVRStatuses(getVRStatuses(state));
      return state;
    case 'APPEND_TIMELOG':
      return state.set('timeLogs', [...state.timeLogs, action.timeLog]);
    case 'SAVE_TIMELOGS':
      saveTimeLogs(getTimeLogs(state));
      return state;
    case 'SAVE_HEADMODELBATCH':
      // console.log(action.headModels);
      saveHeadModelBatch(getHeadModelBatch(state, action.headModels));
      return state;
    case 'SAVE_USERINPUTS':
      saveUserInputs(getUserInputs(state, action.allUserInputs));
      return state;

    default:
      return state;
  }
};
