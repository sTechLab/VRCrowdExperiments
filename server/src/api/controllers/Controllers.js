/**
 * SessionController
 *
 * @flow
 * @format
 */

'use strict';

import type {$Request, $Response} from 'express';
import {
  ExperimentInfo,
  VRStatuses,
  TimeLogs,
  UserInputs,
  HeadModelBatch,
} from '../models/Models';

// export function getSessionCnt(req: $Request, res: $Response): void {
//   Session.find({}, (err, docs) => {
//     console.log(docs);
//     res.json(docs);
//   });
// }

export function saveExperimentInfo(req: $Request, res: $Response): void {
  console.log('Saving experiment info...');
  const data: ExperimentInfo = req.body;
  const experimentInfo = new ExperimentInfo(data);
  experimentInfo.save(function(err) {
    if (err) {
      res.status(500).send('save ExperimentInfo failed!');
    } else {
      res.status(200).send('ExperimentInfo saved!');
    }
  });
}

export function saveVRStatuses(req: $Request, res: $Response): void {
  console.log('Saving vr status...');
  const data: VRStatuses = req.body;
  const vrStatus = new VRStatuses(data);
  vrStatus.save(function(err) {
    if (err) {
      res.status(500).send('save VRStatuses failed!');
    } else {
      res.status(200).send('VRStatuses saved!');
    }
  });
}

export function saveTimeLogs(req: $Request, res: $Response): void {
  console.log('Saving timestamps...');
  const data: TimeLogs = req.body;
  const timeStamps = new TimeLogs(data);
  timeStamps.save(function(err) {
    if (err) {
      res.status(500).send('save TimeLogs faield!');
    } else {
      res.status(200).send('TimeLogs saved!');
    }
  });
}

export function saveUserInputs(req: $Request, res: $Response): void {
  console.log('Saving user inputs...');
  const data: UserInputs = req.body;
  const userInputs = new UserInputs(data);
  userInputs.save(function(err) {
    if (err) {
      res.status(500).send('save UserInputs failed');
    } else {
      res.status(200).send('UserInputs saved!');
    }
  });
}

export function saveHeadModelBatch(req: $Request, res: $Response): void {
  console.log('Saving headmodels batch...');
  const data: HeadModelBatch = req.body;
  const headModelBatch = new HeadModelBatch(data);
  headModelBatch.save(function(err) {
    if (err) {
      res.status(500).send('save ViewMatrixBatch failed');
    } else {
      res.status(200).send('HeadModelBatch saved!');
    }
  });
}
