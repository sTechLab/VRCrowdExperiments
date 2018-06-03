/**
 * Api
 *
 * @flow
 * @format
 */

import axios from 'axios';

import type {
  ExperimentInfo,
  VRStatuses,
  TimeLogs,
  UserInputs,
  HeadModelBatch,
} from './DataTypes';
import ExperimentConfig from '../ExperimentConfig';
const SERVER_DOMAIN = ExperimentConfig.serverDomain;

const errorHandler = e => console.log('axio request error', e);

function serverUri(path: string): string {
  return SERVER_DOMAIN + path;
}

/**
 * To use this, make sure you add axios npm pacakge to your project.
 * @param  {Object}   params     Whatever plain JS data you want to send to server
 * @param  {String}   uri      server endpoint URL
 * @param  {Function} callback optional - if server passes anything back and you need to handle it, provide a callback
 */
export function save(
  params: Object,
  uri: string,
  callback?: (data: ?Object, err: any) => any,
) {
  axios
    .post(serverUri(uri), {params})
    .then(({data}) => callback && callback(data))
    .catch(e => callback && callback(null, e));
}

/**
 * Same as post, but for get request
 */
export function get(
  params: Object,
  uri: string,
  callback?: (data: ?Object, err: any) => any,
) {
  axios
    .get(serverUri(uri), {
      params,
    })
    .then(({data}) => callback && callback(data))
    .catch(e => callback && callback(null, e));
}

export function saveExperimentInfo(experimentInfo: ExperimentInfo): void {
  axios
    .post(serverUri('/ExperimentInfo/save'), experimentInfo)
    .catch(errorHandler);
}

export function saveVRStatuses(vrStatuses: VRStatuses): void {
  axios.post(serverUri('/VRStatuses/save'), vrStatuses).catch(errorHandler);
}

export function saveTimeLogs(timeLogs: TimeLogs): void {
  axios.post(serverUri('/TimeLogs/save'), timeLogs).catch(errorHandler);
}

export function saveHeadModelBatch(headModelBatch: HeadModelBatch): void {
  axios
    .post(serverUri('/HeadModelBatch/save'), headModelBatch)
    .catch(errorHandler);
}

export function saveUserInputs(userInputs: UserInputs): void {
  axios.post(serverUri('/UserInputs/save'), userInputs).catch(errorHandler);
}
