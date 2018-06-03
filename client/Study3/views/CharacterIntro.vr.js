/**
 * Game
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
  StyleSheet,
  CylindricalPanel,
  VrButton,
  Model,
} from 'react-vr';

import {
  DefaultHighlightView,
  StyleText,
  StyleScreen,
  StyleWrapper,
  SCREEN_RADIUS,
} from '../../views/GenericUI.vr';

import type {AppState} from '../redux/RootReduxStore';
import type {AppStepType} from '../redux/GlobalRedux';
import {dispatch} from '../../redux/Misc';
import {typedConnect} from '../../redux/Misc';

import LeaderBoard from './LeaderBoard.vr';
import Avatars from './Avatars.vr';

import {DEV} from '../Configs';
import {getGameCharacterIntro} from '../StandardLanguage';

type OwnProps = {
  languages: Object,
  nextStep: AppStepType,
  avatar_idx: number,
};

type ReduxProps = {
  appStep: AppStepType,
  avatar_order: Array<number>,
};

type Props = OwnProps & ReduxProps;

class CharacterIntro extends React.Component<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    dispatch({type: 'RESET_GAME_PAGE'});
    dispatch({type: 'RESET_SCORES'});
  }

  _setApp(appStepName: AppStepType): void {
    dispatch({
      type: 'CHANGE_APP_STEP',
      appStep: appStepName,
    });
  }

  _renderButton() {
    return (
      <VrButton onClick={() => this._setApp(this.props.nextStep)}>
        <DefaultHighlightView text={'Proceed'} />
      </VrButton>
    );
  }

  _renderPanel() {
    const {languages} = this.props;
    return (
      <CylindricalPanel
        style={{transform: [{rotateY: -20}]}}
        layer={StyleSheet.flatten([
          StyleScreen.gamePanel,
          {radius: SCREEN_RADIUS},
        ])}>
        <View style={StyleScreen.gameDarkScreen}>
          <View style={StyleWrapper.title}>
            <Text style={StyleText.h1}>
              Player{' '}
              {this.props.avatar_order.indexOf(this.props.avatar_idx) + 1}
            </Text>
          </View>
          <View style={StyleWrapper.body}>
            <Text
              style={StyleSheet.flatten([
                StyleText.body,
                {margin: 20, marginBottom: 50},
              ])}>
              {getGameCharacterIntro(this.props.avatar_idx)}
            </Text>
          </View>
          <View style={StyleWrapper.footer}>
            <View style={{alignItems: 'center'}}>{this._renderButton()}</View>
          </View>
        </View>
      </CylindricalPanel>
    );
  }

  render(): React$Element<any> {
    return (
      <View>
        {this._renderPanel()}
        <LeaderBoard avatar_idx={this.props.avatar_idx} />
      </View>
    );
  }
}

const mapStateToProps = (appState: AppState, props: OwnProps): ReduxProps => ({
  appStep: appState.global.appStep,
  avatar_order: appState.global.avatar_order,
});

export default typedConnect(mapStateToProps)(CharacterIntro);
