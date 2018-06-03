/**
 * RootView
 *
 * @flow
 * @format
 */

'use strict';

import {Pano, View, asset} from 'react-vr';
import React, {Component} from 'react';

import type {AppState} from '../redux/RootReduxStore';
import type {AppStepType} from '../redux/GlobalRedux';
import {dispatch} from '../../redux/Misc';
import {typedConnect} from '../../redux/Misc';
import {generateUserID, generateCondition} from '../../utils/ExperimentUtils';
import type {TimeLog} from '../../utils/DataTypes';

import Welcome from '../../views/Welcome.vr';
import Instructions from '../../views/Instructions.vr';
import Video1 from './Video1.vr';
import Video2 from './Video2.vr';
import Exit from '../../views/Exit.vr';
import {Languages} from '../StandardLanguage';

import {DEV, CONDITIONS} from '../Configs';

type OwnProps = {};

type ReduxProps = {
  appStep: AppStepType,
  homeImage: string,
  hasHomeImage: boolean,
};

type Props = OwnProps & ReduxProps;

class RootView extends Component<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  _setUserID(userID: string): void {
    dispatch({
      type: 'ASSIGN_USERID',
      userID: userID,
    });
  }

  _setCondition(condition_idx: number): void {
    dispatch({
      type: 'ASSIGN_CONDITION',
      condition: CONDITIONS[condition_idx],
    });
  }

  _logTime(): void {
    let myTimeLog: TimeLog = {
      step: this.props.appStep,
      timestamp: Date.now(),
    };

    if (DEV) {
      console.log('logginging time', myTimeLog);
    }

    dispatch({
      type: 'APPEND_TIMELOG',
      timeLog: myTimeLog,
    });
  }

  componentDidUpdate() {
    // log each step of the screen and save when it's the last
    this._logTime();
    if (this.props.appStep === 'Exit') {
      dispatch({
        type: 'SAVE_TIMELOGS',
      });
      dispatch({
        type: 'SAVE_VRSTATUSES',
      });
    }
  }

  componentDidMount() {
    // automatically assign participant a userID
    // as well as assign them into experiment / control group
    this._logTime();

    let userID = generateUserID();
    this._setUserID(userID);

    let condition_idx = generateCondition(CONDITIONS.length);
    this._setCondition(condition_idx);

    if (DEV) {
      console.log('condition:', CONDITIONS[condition_idx]);
      console.log('userID:', userID);
    }

    dispatch({
      type: 'SAVE_EXPERIMENTINFO',
    });
  }

  _renderCurrentStep(): React$Element<any> {
    switch (this.props.appStep) {
      case 'Welcome':
        return <Welcome languages={Languages} nextStep="Instructions" />;
      case 'Instructions':
        return <Instructions languages={Languages} nextStep="Video1" />;
      case 'Video1':
        return <Video1 />;
      case 'Video2':
        return <Video2 />;
      case 'Exit':
        return <Exit languages={Languages} />;
      default:
        return <Welcome languages={Languages} nextStep="Instructions" />;
    }
  }

  _renderHomeImage() {
    if (this.props.hasHomeImage) {
      return (
        <Pano
          style={{transform: [{rotateY: 20}]}}
          source={asset(this.props.homeImage)}
        />
      );
    }
  }

  _renderLobby(): React$Element<any> {
    return (
      <View>
        {this._renderHomeImage()}
        {this._renderCurrentStep()}
      </View>
    );
  }

  render(): React$Element<any> {
    return this._renderLobby();
  }
}

const mapStateToProps = (appState: AppState, props: OwnProps): ReduxProps => ({
  homeImage: appState.global.homeImage,
  hasHomeImage: appState.global.hasHomeImage,
  appStep: appState.global.appStep,
});

export default typedConnect(mapStateToProps)(RootView);
