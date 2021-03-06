/**
 * Video2
 *
 * @flow
 * @format
 */

'use strict';

import React from 'react';
import {
  asset,
  Text,
  View,
  VideoPano,
  VideoControl,
  MediaPlayerState,
  StyleSheet,
  CylindricalPanel,
  VrButton,
} from 'react-vr';

import {
  DefaultHighlightView,
  StyleText,
  StyleScreen,
  SCREEN_RADIUS,
} from '../../views/GenericUI.vr';

import type {AppState} from '../redux/RootReduxStore';
import type {AppStepType} from '../redux/GlobalRedux';
import {dispatch} from '../../redux/Misc';
import {typedConnect} from '../../redux/Misc';

import {DEV, VIDEO2_EXPERIMENT, VIDEO2_CONTROL} from '../Configs';

type OwnProps = {};

type ReduxProps = {
  appStep: AppStepType,
  condition: string,
};

type Props = OwnProps & ReduxProps;

type OwnState = {
  playerState: MediaPlayerState,
  panelVisible: boolean,
};

const nextStep = 'Exit';

class Video2 extends React.Component<Props, OwnState> {
  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      playerState: new MediaPlayerState({autoPlay: false, muted: true}), // init with muted, autoPlay
      panelVisible: true,
    };
  }

  _setApp(appStepName: AppStepType): void {
    dispatch({
      type: 'CHANGE_3D_SCENE',
      hasHomeImage: true,
      appStep: appStepName,
    });
  }

  _playVideo() {
    this.state.playerState.play();
    this.state.playerState.setMuted(false); // only supported in samsuning internet
    if (!DEV) {
      // only hides the plane when not in dev
      this.setState({panelVisible: false});
    }
  }

  componentDidMount() {
    this._playVideo();
  }

  _renderVideoControl() {
    // renders video control when in development mode
    if (DEV) {
      return (
        <View style={{alignItems: 'center', marginBottom: 40}}>
          <VideoControl
            style={{height: 80, width: 500}}
            playerState={this.state.playerState}
          />
        </View>
      );
    }
  }

  _renderButton(text: string) {
    return (
      <View style={{alignItems: 'center'}}>
        <VrButton
          onClick={() => {
            this._playVideo();
          }}>
          <DefaultHighlightView text={text} />
        </VrButton>
      </View>
    );
  }

  _renderVideo() {
    let video_path;
    if (this.props.condition == 'experiment') {
      video_path = VIDEO2_EXPERIMENT;
    } else {
      video_path = VIDEO2_CONTROL;
    }
    return (
      <VideoPano
        playerState={this.state.playerState}
        source={asset(video_path)}
        onEnded={() => {
          this._setApp(nextStep);
        }}
      />
    );
  }

  _renderBody() {
    return (
      <View style={{marginLeft: 20, marginBottom: 50}}>
        <Text style={StyleText.body}>This video lasts 2 minutes.</Text>
        <Text style={StyleText.body}>
          Click 'Play' to start streaming this video.
        </Text>
      </View>
    );
  }

  _renderPanel() {
    if (this.state.panelVisible) {
      return (
        <CylindricalPanel
          layer={StyleSheet.flatten([
            StyleScreen.panel,
            {radius: SCREEN_RADIUS},
          ])}>
          <View style={StyleScreen.darkScreen}>
            <Text style={StyleText.h1}>Video 2 / 2</Text>
            <Text style={StyleText.warning}>
              Stop at any time if you experience discomfort.
            </Text>
            {this._renderBody()}
            {this._renderVideoControl()}
            {this._renderButton('Play')}
          </View>
        </CylindricalPanel>
      );
    }
  }

  render(): React$Element<any> {
    return (
      <View>
        {this._renderVideo()}
        {/* {this._renderPanel()} */}
      </View>
    );
  }
}

const mapStateToProps = (appState: AppState, props: OwnProps): ReduxProps => ({
  appStep: appState.global.appStep,
  condition: appState.logger.condition,
});

export default typedConnect(mapStateToProps)(Video2);
