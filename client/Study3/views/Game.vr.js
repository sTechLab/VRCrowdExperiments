/**
 * Game
 *
 * @flow
 * @format
 */

'use strict';

import React from 'react';
import {Text, View, StyleSheet, CylindricalPanel} from 'react-vr';
import {
  StyleText,
  StyleScreen,
  StyleWrapper,
  SCREEN_RADIUS,
} from '../../views/GenericUI.vr';
import {RESPONSE_LOOKUP_TABLE} from '../Configs';

import type {AppState} from '../redux/RootReduxStore';
import type {AppStepType} from '../redux/GlobalRedux';
import {dispatch} from '../../redux/Misc';
import {typedConnect} from '../../redux/Misc';

import GameMessage from './GameMessage.vr';
import GameControl from './GameControl.vr';
import LeaderBoard from './LeaderBoard.vr';
import Avatars from './Avatars.vr';

type OwnProps = {
  nextStep: AppStepType,
  avatar_idx: number,
};

type ReduxProps = {
  avatar_order: Array<number>,
  gamePage: number,
  allUserInputs: Object,
  myScore: number,
  oppScore: number,
};

type Props = OwnProps & ReduxProps;

type OwnState = {
  player_idx: number,
};

class Game extends React.Component<Props, OwnState> {
  props: Props;
  state: OwnState;

  constructor(props: Props) {
    super(props);
    this.state = {
      player_idx: this.props.avatar_order.indexOf(this.props.avatar_idx),
    };
  }

  componentWillMount() {
    dispatch({type: 'SET_AVATAR_IDX', avatar_idx: this.props.avatar_idx});
    dispatch({
      type: 'PUSH_USER_INPUT',
      key: 'avatar_order',
      value: this.props.avatar_order,
    });
  }

  componentWillUnmount() {
    dispatch({
      type: 'PUSH_USER_INPUT',
      key: `oppScore${this.props.avatar_idx}`,
      value: this.props.oppScore,
    });

    dispatch({
      type: 'PUSH_USER_INPUT',
      key: `myScore${this.props.avatar_idx}`,
      value: this.props.myScore,
    });

    if (this.props.nextStep === 'Exit') {
      dispatch({
        type: 'SAVE_USERINPUTS',
        allUserInputs: this.props.allUserInputs,
      });
    }
  }

  _renderTitle() {
    let resultPage = [8];
    let returnBody;
    if (resultPage.includes(this.props.gamePage)) {
      returnBody = 'Game Result';
    } else {
      returnBody =
        'Round ' +
        (this.state.player_idx * 4 +
          Math.floor(this.props.gamePage / 2) +
          1).toString();
    }
    return <Text style={StyleText.h1}>{returnBody}</Text>;
  }

  _renderPanel() {
    return (
      <CylindricalPanel
        style={{transform: [{rotateY: -35}]}}
        layer={StyleSheet.flatten([
          StyleScreen.panel,
          {radius: SCREEN_RADIUS},
        ])}>
        <View style={StyleScreen.gameDarkScreen}>
          <View style={StyleWrapper.title}>{this._renderTitle()}</View>
          <View style={StyleWrapper.shortbody}>
            <GameMessage avatar_idx={this.props.avatar_idx} />
          </View>
          <View style={StyleWrapper.footer}>
            <GameControl
              avatar_idx={this.props.avatar_idx}
              nextStep={this.props.nextStep}
            />
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
  avatar_order: appState.global.avatar_order,
  gamePage: appState.game.gamePage,
  allUserInputs: appState.game.allUserInputs,
  myScore: appState.game.myScore,
  oppScore: appState.game.oppScore,
});

export default typedConnect(mapStateToProps)(Game);
