/**
 * Welcome UI
 *
 * @flow
 * @format
 */

'use strict';

import React from 'react';
import {
  asset,
  Text,
  Image,
  View,
  VideoPano,
  StyleSheet,
  CylindricalPanel,
  VrButton,
  VrHeadModel,
} from 'react-vr';

import {
  HighlightView,
  DefaultHighlightView,
  StyleText,
  StyleScreen,
  StyleWrapper,
  SCREEN_RADIUS,
} from './GenericUI.vr';

import {Header, Body, Footer} from './ViewContainers.vr';

import {Keyboard, KEY_HEIGHT} from './Keyboard.vr';

import ExperimentConfig from '../ExperimentConfig';

import {dispatch} from '../redux/Misc';
import {typedConnect} from '../redux/Misc';

type OwnProps = {
  languages: Object,
  nextStep: any,
};

type ReduxProps = {
  appStep: any,
  headsetStatus: boolean,
};

type Props = OwnProps & ReduxProps;

type OwnState = {
  _checkHeadsetStatusTimer: number,
};

class Welcome extends React.Component<Props, OwnState> {
  props: Props;
  state: OwnState;

  constructor(props: Props) {
    super(props);
  }

  _setApp(appStepName: any): void {
    dispatch({
      type: 'CHANGE_APP_STEP',
      appStep: appStepName,
    });
  }

  _setHeadsetStatus(status: boolean): void {
    dispatch({
      type: 'CHANGE_HEADSETSTATUS',
      headsetStatus: status,
    });
  }

  componentDidMount() {
    // automatically check gear VR headset status every second
    this.setState({
      _checkHeadsetStatusTimer: window.setInterval(() => {
        this._setHeadsetStatus(VrHeadModel.inVR());
      }, 1000),
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.state._checkHeadsetStatusTimer);
  }

  _renderVerifyButton() {
    if (this.props.headsetStatus || ExperimentConfig.isDev) {
      return (
        <View style={{alignItems: 'center'}}>
          <VrButton
            onClick={() => {
              this._setApp(this.props.nextStep);
              if (ExperimentConfig.isDev) {
                console.log('inVR:', VrHeadModel.inVR());
              }
            }}>
            <DefaultHighlightView text={'Continue'} />
          </VrButton>
        </View>
      );
    }
  }
  _renderImage() {
    if (this.props.headsetStatus) {
      return (
        <Image
          style={{width: 280, height: 161}}
          source={asset('nav-selection.png')}
        />
      );
    } else {
      return (
        <Image
          style={{width: 180, height: 263}}
          source={asset('browser-logo.jpg')}
        />
      );
    }
  }

  _renderPanel() {
    const {languages} = this.props;
    return (
      <CylindricalPanel
        layer={StyleSheet.flatten([
          StyleScreen.panel,
          {radius: SCREEN_RADIUS},
        ])}>
        <View style={StyleScreen.darkScreen}>
          <View style={StyleWrapper.title}>
            <Text style={StyleText.h1}>{languages.WELCOME_TITLE}</Text>
          </View>
          <View style={StyleWrapper.byline}>
            <Text style={StyleText.h2}>
              {languages.WELCOME_LABEL}
              {this.props.headsetStatus ? 'Detected' : 'Undetected'}
            </Text>
          </View>
          <View style={StyleWrapper.body}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginLeft: 20,
                marginRight: 20,
                flexBasis: 270,
                flexGrow: 0,
              }}>
              <View style={{width: 300, paddingTop: 15, alignItems: 'center'}}>
                {this._renderImage()}
              </View>
              <View style={{width: 550, marginLeft: 10}}>
                <Text style={StyleText.body}>
                  {this.props.headsetStatus ? (
                    languages.WELCOME_BODY_HEADSET_DETECTED
                  ) : (
                    languages.WELCOME_BODY_HEADSET_NOTDETECTED
                  )}
                </Text>
              </View>
            </View>
          </View>
          <View style={StyleWrapper.footer}>{this._renderVerifyButton()}</View>
        </View>
      </CylindricalPanel>
    );
  }

  render(): React$Element<any> {
    return this._renderPanel();
  }
}

const mapStateToProps = (appState: any, props: OwnProps): ReduxProps => ({
  appStep: appState.global.appStep,
  headsetStatus: appState.global.headsetStatus,
});

export default typedConnect(mapStateToProps)(Welcome);
