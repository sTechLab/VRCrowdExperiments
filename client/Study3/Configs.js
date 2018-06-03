/**
 * GlobalConfigs
 *
 * @flow
 * @format
 */

'use strict';

export const DEV = true;
export const LOG_VRSTATUS = true;
export const SERVER_DOMAIN = 'http://vrai-moon.herokuapp.com'; // add server domain here (localhost:8080)
// http://vrai-moon.herokuapp.com
// export const SERVER_ALIAS = 'http://stech.nyc/moon';
export const SERVER_ALIAS = 'http://vrai-moon.herokuapp.com';

export const CONDITIONS = ['Short', 'Normal', 'Tall'];

export const AVATAR_NAMES = ['s1', 's2'];
export const AVATAR_DISPLAY_NAMES = ['Andrea', 'Jeff'];
export const INPUT_FIELDS_MAP = {
  '0': ['split1', 'split2'],
  '1': ['split3', 'split4']
};
export const AR_FIELDS_MAP = {
  '0': ['ar1', 'ar2'],
  '1': ['ar3', 'ar4']
};

export const RESPONSE_LOOKUP_TABLE = {
  '1': {
    '0': 'split1',
    '1': 'split3'
  },
  '3': {
    '0': 'ar1',
    '1': 'ar3'
  },
  '5': {
    '0': 'split2',
    '1': 'split4'
  },
  '7': {
    '0': 'ar2',
    '1': 'ar4'
  }
};
