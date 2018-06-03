/**
 * Instructions UI
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
  StyleSheet,
  CylindricalPanel,
  VrButton,
} from 'react-vr';

import {
  DefaultHighlightView,
  StyleText,
  StyleScreen,
  StyleWrapper,
  SCREEN_RADIUS,
} from './GenericUI.vr';

import {Keyboard, KEY_HEIGHT} from './Keyboard.vr';

import {dispatch} from '../redux/Misc';
import {typedConnect} from '../redux/Misc';

type OwnProps = {
  languages: Object,
  nextStep: string,
};

type ReduxProps = {
  appStep: any,
};

type Props = OwnProps & ReduxProps;

type OwnState = {
  page: number,
};

class Instructions extends React.Component<Props, OwnState> {
  props: Props;
  state: OwnState;

  constructor(props: Props) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  _setApp(appStepName: any): void {
    dispatch({
      type: 'CHANGE_3D_SCENE',
      hasHomeImage: false,
      appStep: appStepName,
    });
  }

  _renderButton() {
    const {languages} = this.props;
    switch (this.state.page) {
      case 0:
        return (
          <View style={{alignItems: 'center'}}>
            <VrButton onClick={() => this.setState({page: 1})}>
              <DefaultHighlightView
                text={languages.INS_BUTTON_TEXTS[this.state.page]}
              />
            </VrButton>
          </View>
        );
      case 1:
        return (
          <View style={{alignItems: 'center'}}>
            <VrButton onClick={() => this.setState({page: 2})}>
              <DefaultHighlightView
                text={languages.INS_BUTTON_TEXTS[this.state.page]}
              />
            </VrButton>
          </View>
        );
      case 2:
        return (
          <View style={{alignItems: 'center'}}>
            <VrButton onClick={() => this.setState({page: 3})}>
              <DefaultHighlightView
                text={languages.INS_BUTTON_TEXTS[this.state.page]}
              />
            </VrButton>
          </View>
        );
      case 3:
        return (
          <View style={{alignItems: 'center'}}>
            <VrButton onClick={() => this._setApp(this.props.nextStep)}>
              <DefaultHighlightView
                text={languages.INS_BUTTON_TEXTS[this.state.page]}
              />
            </VrButton>
          </View>
        );
      default:
        return (
          <View style={{alignItems: 'center'}}>
            <VrButton onClick={() => this.setState({page: 0})}>
              <DefaultHighlightView
                text={languages.INS_BUTTON_TEXTS[this.state.page]}
              />
            </VrButton>
          </View>
        );
    }
  }

  _renderBody(): React$Element<any> {
    return (
      <View style={{marginLeft: 30, marginRight: 30, marginBottom: 50}}>
        <Text style={StyleText.body}>
          {this.props.languages.INS_BODY_TEXTS[this.state.page]}
        </Text>
      </View>
    );
  }

  _renderPanel(): React$Element<any> {
    const {languages} = this.props;
    return (
      <CylindricalPanel
        layer={StyleSheet.flatten([
          StyleScreen.panel,
          {radius: SCREEN_RADIUS},
        ])}>
        <View style={StyleScreen.darkScreen}>
          <View style={StyleWrapper.title}>
            <Text style={StyleText.h1}>{languages.INS_TITLE}</Text>
          </View>
          <View style={StyleWrapper.byline}>
            <Text style={StyleText.warning}>{languages.INS_WARNING}</Text>
          </View>
          <View style={StyleWrapper.body}>{this._renderBody()}</View>
          <View style={StyleWrapper.footer}>{this._renderButton()}</View>
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
});

export default typedConnect(mapStateToProps)(Instructions);
