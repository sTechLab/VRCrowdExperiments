/**
 * Root UI component for the app
 *
 * @flow
 * @format
 */

'use strict';

import ExperimentConfig from './ExperimentConfig';
import React from 'react';
import { AppRegistry } from 'react-vr';

// STUDY SWITCH POINT
import App from './Study1/index.vr';
// import App from './Study2/index.vr';
// import App from './Study3/index.vr';

AppRegistry.registerComponent(ExperimentConfig.name, () => App);
