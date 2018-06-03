/**
 * GameControl
 *
 * @flow
 * @format
 */

import React from 'react';
import {View, VrButton} from 'react-vr';

import {dispatch} from '../../redux/Misc';
import {typedConnect} from '../../redux/Misc';

import type {AppState} from '../redux/RootReduxStore';
import type {AppStepType} from '../redux/GlobalRedux';

import ControlAcceptReject from './ControlAcceptReject.vr';
import ControlKeyboard from './ControlKeyboard.vr';

import {DefaultHighlightView} from '../../views/GenericUI.vr';

type OwnProps = {
  avatar_idx: number,
  nextStep: AppStepType,
};
type ReduxProps = {
  gamePage: number,
};
type Props = OwnProps & ReduxProps;

class GameControl extends React.Component<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  _setApp(appStepName: AppStepType): void {
    if (appStepName === 'Exit') {
      dispatch({
        type: 'SET_HOME_IMAGE',
        homeImage: 'home.jpg',
        hasHomeImage: true,
        homeImageRotation: 20,
      });
    }
    dispatch({
      type: 'CHANGE_APP_STEP',
      appStep: appStepName,
    });
  }

  _renderContinue() {
    return (
      <VrButton
        style={{alignItems: 'center'}}
        onClick={() => dispatch({type: 'INCREMENT_GAME_PAGE'})}>
        <DefaultHighlightView text={'Continue'} />
      </VrButton>
    );
  }

  _renderNextStep() {
    return (
      <VrButton
        style={{alignItems: 'center'}}
        onClick={() => this._setApp(this.props.nextStep)}>
        <DefaultHighlightView text={'Continue'} />
      </VrButton>
    );
  }

  // renders the buttons and keyboard
  _renderControl() {
    let continuePages = [1, 3, 5, 7];
    if (continuePages.includes(this.props.gamePage)) {
      return <View>{this._renderContinue()}</View>;
    } else {
      switch (this.props.gamePage) {
        case 0:
          return <ControlKeyboard avatar_idx={this.props.avatar_idx} />;
        case 2:
          return <ControlAcceptReject avatar_idx={this.props.avatar_idx} />;
        case 4:
          return <ControlKeyboard avatar_idx={this.props.avatar_idx} />;
        case 6:
          return <ControlAcceptReject avatar_idx={this.props.avatar_idx} />;
        case 8:
          return <View>{this._renderNextStep()}</View>;
        default:
          return null;
      }
    }
  }

  render() {
    return <View>{this._renderControl()}</View>;
  }
}

const mapStateToProps = (appState: AppState, props: OwnProps): ReduxProps => ({
  gamePage: appState.game.gamePage,
});

export default typedConnect(mapStateToProps)(GameControl);
