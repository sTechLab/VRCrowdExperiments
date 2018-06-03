/**
 * TrackingScene
 *
 * @flow
 * @format
 */

'use strict';

import React, {Component} from 'react';

import {
  asset,
  Pano,
  View,
  CylindricalPanel,
  Text,
  StyleSheet,
  VrHeadModel,
} from 'react-vr';

import type {AppState} from '../redux/RootReduxStore';
import type {HeadModel} from '../../utils/DataTypes';
import Avatars from './Avatars.vr';
import Animal from './Animal.vr';

import {dispatch} from '../../redux/Misc';
import {typedConnect} from '../../redux/Misc';

import {SCREEN_RADIUS, StyleText, StyleScreen} from '../../views/GenericUI.vr';
import {
  SESSION_TIMELIMIT,
  HEADMODELBATCH_SIZE,
  FRAME_RATE,
} from '../redux/TrackingSessionRedux';

import {COUNT_DOWN} from '../Configs';

type OwnProps = {};

type ReduxProps = {
  remainingSec: number,
  sessionEnded: boolean,
  allUserInputs: Object,
  panoImage: string,
  caught_fox: boolean,
};

type Props = OwnProps & ReduxProps;

type OwnState = {
  headModels: Array<HeadModel>,
  _timer: number,
  startTimestamp: number,
};

class TrackingScene extends Component<Props, OwnState> {
  props: Props;
  state: OwnState;

  constructor(props: Props) {
    super(props);
    this.state = {headModels: [], _timer: 0, startTimestamp: 0};
  }

  componentWillMount() {
    dispatch({type: 'INIT_SESSION'});
  }

  _logHeadModel(): void {
    let myHeadModel = {
      timeDelta: Date.now() - this.state.startTimestamp,
      yawPitchRoll: VrHeadModel.yawPitchRoll(),
    };
    console.log(myHeadModel);

    if (this.state.headModels.length === HEADMODELBATCH_SIZE) {
      // if the local state has stored a full batch of head models
      // dispatch to save to the database and clear local state
      dispatch({
        type: 'SAVE_HEADMODELBATCH',
        headModels: this.state.headModels,
      });
      this.setState({headModels: []});
    } else {
      this.setState({
        // if local state not full, keep appending to the end
        headModels: [...this.state.headModels, myHeadModel],
      });
    }
  }

  _logHeadModelTimer() {
    this.setState({
      _timer: setInterval(() => {
        this._logHeadModel();
      }, 1000.0 / FRAME_RATE),
    });
  }

  _countDown(): void {
    setTimeout(() => {
      if (this.props.sessionEnded || this.props.caught_fox) {
        this._endSession();
        return;
      }
      dispatch({type: 'COUNTDOWN'});
      this._countDown();
    }, 1000);
  }

  _endSession(): void {
    dispatch({
      // save the last bits of what's in the headmodel batch to database
      type: 'SAVE_HEADMODELBATCH',
      headModels: this.state.headModels,
    });

    dispatch({
      type: 'CHANGE_3D_SCENE',
      appStep: 'Exit',
      hasHomeImage: true,
      homeImage: 'home.jpg',
    });
    console.log(this.props.allUserInputs);
    dispatch({
      type: 'SAVE_USERINPUTS',
      allUserInputs: this.props.allUserInputs,
    });
  }

  componentDidMount(): void {
    if (COUNT_DOWN) {
      this._countDown();
      this._logHeadModelTimer();
    }
    this.setState({startTimestamp: Date.now()});
  }

  componentWillUnmount() {
    clearInterval(this.state._timer);
    dispatch({
      type: 'PUSH_USER_INPUT',
      key: 'caught_fox',
      value: this.props.caught_fox,
    });
    dispatch({
      type: 'PUSH_USER_INPUT',
      key: 'remainingSec',
      value: this.props.remainingSec,
    });
  }

  _renderScene(): React$Element<any> {
    return (
      <Pano
        style={{transform: [{rotateY: -40}]}}
        source={asset(this.props.panoImage)}
      />
    );
  }

  _renderPanel() {
    return (
      <CylindricalPanel
        layer={StyleSheet.flatten([
          StyleScreen.panel,
          {radius: SCREEN_RADIUS},
        ])}>
        <View style={StyleScreen.darkScreen}>
          <Text style={StyleText.h1}>
            Remaining Seconds: {this.props.remainingSec}
          </Text>
        </View>
      </CylindricalPanel>
    );
  }

  _renderAnimal() {
    if (this.props.remainingSec < 10) {
      return <Animal />;
    } else {
      return <View />;
    }
  }

  render(): React$Element<any> {
    return (
      <View>
        {this._renderScene()}
        <Avatars />
        {this._renderAnimal()}
        {/* <Animal /> */}
        {/* {this._renderPanel()} */}
      </View>
    );
  }
}

const mapStateToProps = (appState: AppState, props: OwnProps): ReduxProps => ({
  remainingSec: appState.trackingSession.remainingSec,
  sessionEnded: appState.trackingSession.sessionEnded,
  allUserInputs: appState.global.allUserInputs,
  panoImage: appState.global.panoImage,
  caught_fox: appState.trackingSession.caught_fox,
});

export default typedConnect(mapStateToProps)(TrackingScene);
