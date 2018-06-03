/**
 * Game
 *
 * @flow
 * @format
 */

'use strict';

import React from 'react';
import {Text, View, CylindricalPanel, StyleSheet} from 'react-vr';

import {
  StyleText,
  StyleScreen,
  StyleLDB,
  SCREEN_RADIUS,
} from '../../views/GenericUI.vr';

import type {AppState} from '../redux/RootReduxStore';
import type {AppStepType} from '../redux/GlobalRedux';
import {dispatch} from '../../redux/Misc';
import {typedConnect} from '../../redux/Misc';

import {DEV, AVATAR_DISPLAY_NAMES} from '../Configs';

type OwnProps = {
  avatar_idx: number,
};

type ReduxProps = {
  myScore: number,
  oppScore: number,
};

type Props = OwnProps & ReduxProps;

class LeaderBoard extends React.Component<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  _renderPanel() {
    return (
      <View
        style={StyleSheet.flatten([
          StyleLDB.screen,
          {flex: 1, flexDirection: 'row'},
        ])}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <View style={StyleLDB.cell}>
            <Text style={StyleText.body}>{'You'}</Text>
          </View>
          <View style={StyleLDB.cell}>
            <Text style={StyleText.body}>
              {AVATAR_DISPLAY_NAMES[this.props.avatar_idx]}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <View style={StyleLDB.cell}>
            <Text style={StyleText.body}>{`$${this.props.myScore}`}</Text>
          </View>
          <View style={StyleLDB.cell}>
            <Text style={StyleText.body}>{`$${this.props.oppScore}`}</Text>
          </View>
        </View>
      </View>
    );
  }

  render(): React$Element<any> {
    return (
      <CylindricalPanel
        style={{
          transform: [{rotateY: -15}, {translate: [0, 180, 0]}],
        }}
        layer={StyleSheet.flatten([StyleLDB.panel, {radius: SCREEN_RADIUS}])}>
        {this._renderPanel()}
      </CylindricalPanel>
    );
  }
}

const mapStateToProps = (appState: AppState, props: OwnProps): ReduxProps => ({
  myScore: appState.game.myScore,
  oppScore: appState.game.oppScore,
});

export default typedConnect(mapStateToProps)(LeaderBoard);
