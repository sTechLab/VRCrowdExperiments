/**
 * @flow
 */

import {
  SERVER_DOMAIN as SERVER_DOMAIN_STUDY_1,
  DEV as DEV_STUDY_1
} from './Study1/Configs';

import {
  SERVER_DOMAIN as SERVER_DOMAIN_STUDY_2,
  DEV as DEV_STUDY_2
} from './Study2/Configs';

import {
  SERVER_DOMAIN as SERVER_DOMAIN_STUDY_3,
  DEV as DEV_STUDY_3
} from './Study3/Configs';

const Study1Config = {
  serverDomain: SERVER_DOMAIN_STUDY_1,
  isDev: DEV_STUDY_1,
  name: 'Study1'
};

const Study2Config = {
  serverDomain: SERVER_DOMAIN_STUDY_2,
  isDev: DEV_STUDY_2,
  name: 'Study2'
};

const Study3Config = {
  serverDomain: SERVER_DOMAIN_STUDY_3,
  isDev: DEV_STUDY_3,
  name: 'Study3'
};

// STUDY SWITCH POINT
export default Study1Config;
// export default Study2Config;
// export default Study3Config;
