/**
 * Route
 *
 * @flow
 * @format
 */

'use strict';

import {
  saveExperimentInfo,
  saveVRStatuses,
  saveTimeLogs,
  saveUserInputs,
  saveHeadModelBatch,
} from '../controllers/Controllers';

import type {$Application} from 'express';

export default function route(app: $Application): void {
  app.route('/ExperimentInfo/save').post(saveExperimentInfo);
  app.route('/VRStatuses/save').post(saveVRStatuses);
  app.route('/TimeLogs/save').post(saveTimeLogs);
  app.route('/UserInputs/save').post(saveUserInputs);
  app.route('/HeadModelBatch/save').post(saveHeadModelBatch);
  // app.route('/session/test').get(getSessionCnt);
}
