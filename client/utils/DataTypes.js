/**
 * DataTypes
 *
 * @flow
 * @format
 */

export type ExperimentInfo = {
  userID: string,
  condition: string,
  studyName: string,
};

export type VRStatus = {
  inVR: boolean,
  timestamp: number,
};

export type VRStatuses = {
  userID: string,
  vrStatuses: Array<VRStatus>,
};

export type TimeLog = {
  step: string,
  timestamp: number,
};

export type TimeLogs = {
  userID: string,
  timeLogs: Array<TimeLog>,
};

export type UserInput = {
  name: string,
  value: any,
};

export type UserInputs = {
  userID: string,
  userInputs: Array<UserInput>,
};

export type HeadModel = {
  yawPitchRoll: Array<number>, // rotation in yaw pitch roll in degrees
  timeDelta: number,
};

export type HeadModelBatch = {
  userID: string,
  headModels: Array<HeadModel>,
};
