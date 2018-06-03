/**
 * App - Root UI Component
 *
 * @flow
 * @format
 */

'use strict';

import {Provider} from 'react-redux';
import React from 'react';
import RootView from './RootView.vr';
import {VrHeadModel} from 'react-vr';
import {dispatch} from '../../redux/Misc';
import type {VRStatus} from '../../utils/DataTypes';
import {LOG_VRSTATUS, AVATAR_NAMES, DEV} from '../Configs';
import {generateOrder} from '../../utils/ExperimentUtils';

type Props = {};
type OwnState = {
  timer: number,
};

export default class App extends React.Component<Props, OwnState> {
  props: Props;
  state: OwnState;

  constructor(props: Props) {
    super(props);
  }

  _logVRStatus() {
    let vrStatus: vrStatus = {
      inVR: VrHeadModel.inVR(),
      timestamp: Date.now(),
    };

    if (DEV) {
      console.log('logging vr headset status', vrStatus);
    }

    dispatch({
      type: 'APPEND_VRSTATUS',
      vrStatus: vrStatus,
    });
  }

  _setOrder(order: Array<number>): void {
    dispatch({type: 'ASSIGN_ORDER', avatar_order: order});
  }

  componentWillMount() {
    let avatar_order = generateOrder(AVATAR_NAMES.length);
    this._setOrder(avatar_order);
    if (DEV) {
      console.log('avatar_order', avatar_order);
    }
  }

  componentDidMount() {
    if (LOG_VRSTATUS) {
      const max = 10;
      const min = 5;
      let rand = Math.floor(Math.random() * (max - min + 1) + min);

      this.setState({
        timer: window.setInterval(() => {
          this._logVRStatus();
        }, rand * 1000),
      });
    }
  }
  render() {
    return <RootView />;
  }
}
