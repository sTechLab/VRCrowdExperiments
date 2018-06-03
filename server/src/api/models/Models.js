/**
 * Data Models
 *
 * @flow
 * @format
 */

'use strict';

import mongoose from 'mongoose';

export const ExperimentInfoSchema = mongoose.Schema({
  // information about the study
  userID: String,
  condition: String,
  studyName: String
});

export const ExperimentInfo = mongoose.model(
  'ExperimentInfo',
  ExperimentInfoSchema
);

export const VRStatusesSchema = mongoose.Schema({
  userID: String,
  // $FlowFixMe
  vrStatuses: [mongoose.Schema.Types.Mixed]
});

export const VRStatuses = mongoose.model('VRStatuses', VRStatusesSchema);

export const TimeLogsSchema = mongoose.Schema({
  userID: String,
  // $FlowFixMe
  timeLogs: [mongoose.Schema.Types.Mixed]
});

export const TimeLogs = mongoose.model('TimeLogs', TimeLogsSchema);

export const UserInputsSchema = mongoose.Schema({
  userID: String,
  // $FlowFixMe
  userInputs: [mongoose.Schema.Types.Mixed]
});

export const UserInputs = mongoose.model('UserInputs', UserInputsSchema);

export const HeadModelBatchSchema = mongoose.Schema({
  // a batch of headmodels associated with a userID
  userID: String,
  // $FlowFixMe
  headModels: [mongoose.Schema.Types.Mixed]
});

export const HeadModelBatch = mongoose.model(
  'HeadModelBatch',
  HeadModelBatchSchema
);
