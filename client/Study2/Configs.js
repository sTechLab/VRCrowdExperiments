/**
 * GlobalConfigs
 *
 * @flow
 * @format
 */

'use strict';

export const DEV = true;
export const LOG_VRSTATUS = true;
export const COUNT_DOWN = true;
export const TEST_MODEL = false;
// export const SERVER_DOMAIN = 'http://vrai-side.herokuapp.com'; // add server domain here (localhost:8080)
export const SERVER_DOMAIN = 'http://localhost:8080';
// export const SERVER_ALIAS = 'http://stech.nyc/side';
export const SERVER_ALIAS = 'http://vrai-side.herokuapp.com';

export const CONDITIONS = ['Zero', 'Low', 'Medium', 'High'];

export const AVATAR_PATH = 'study2poses/';
export const AVATAR_NAMES = [
  'f1',
  'f2',
  'f3',
  'f4',
  'f5',
  'm1',
  'm2',
  'm3',
  'm4',
  'm5',
];

const INNER_RADIUS = 400;

const AVATAR_TRANSFORM_RADS = [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.2, 2.7, 3.0];
const ORIENTATION_MAP = {front: 180, left: -90, right: 90, back: 0};
export function getAvatarTranforms(orientations: Array<string>) {
  let rads = AVATAR_TRANSFORM_RADS;
  let transforms = [];
  for (let i = 0; i < rads.length; i++) {
    let x = rads[i];
    let transform = [
      {
        translate: [
          INNER_RADIUS * Math.cos(x),
          -120,
          -INNER_RADIUS * Math.sin(x),
        ],
      },
      {scale: 1.0},
      {rotateY: ORIENTATION_MAP[orientations[i]]},
    ];
    transforms.push(transform);
  }
  return transforms;
}
