/**
 * RootView
 *
 * @flow
 * @format
 */

'use strict';

import {Pano, View, asset, AmbientLight} from 'react-vr';
import React, {Component} from 'react';

import type {AppState} from '../redux/RootReduxStore';
import type {AppStepType} from '../redux/GlobalRedux';
import {dispatch} from '../../redux/Misc';
import {typedConnect} from '../../redux/Misc';
import {generateUserID, generateCondition} from '../../utils/ExperimentUtils';
import type {TimeLog} from '../../utils/DataTypes';

import Welcome from '../../views/Welcome.vr';
import Instructions from '../../views/Instructions.vr';
import Game from './Game.vr';
import CharacterIntro from './CharacterIntro.vr';
import AvatarEditor from './AvatarEditor.vr';
import AvatarDialog from './AvatarDialog.vr';
import Avatars from './Avatars.vr';
import Exit from '../../views/Exit.vr';
import {Languages} from '../StandardLanguage';

import {DEV, CONDITIONS} from '../Configs';

type OwnProps = {};

type ReduxProps = {
  appStep: AppStepType,
  homeImage: string,
  homeImageRotation: number,
  hasHomeImage: boolean,
  avatar_order: Array<number>,
  gamePage: number,
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

  componentWillMount() {
    // automatically assign participant a userID
    // as well as assign them into experiment / control group

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

  // the character and sizeCondition is manually assigned at the moment.
  _renderCurrentStep() {
    switch (this.props.appStep) {
      case 'Welcome':
        return <Welcome languages={Languages} nextStep="Instructions" />;
      case 'Instructions':
        return <Instructions languages={Languages} nextStep="AvatarEditor" />;
      case 'AvatarEditor':
        return <AvatarEditor languages={Languages} nextStep="AvatarDialog1" />;
      // case 'CharacterIntro1':
      //   return (
      //     <CharacterIntro
      //       languages={Languages}
      //       avatar_idx={this.props.avatar_order[0]}
      //       nextStep="AvatarDialog1"
      //     />
      //   );
      case 'AvatarDialog1':
        return (
          <AvatarDialog
            avatar_idx={this.props.avatar_order[0]}
            languages={Languages}
            nextStep="Game1"
          />
        );
      case 'Game1':
        return (
          <Game
            languages={Languages}
            avatar_idx={this.props.avatar_order[0]}
            nextStep="CharacterIntro2"
          />
        );
      case 'CharacterIntro2':
        return (
          <CharacterIntro
            languages={Languages}
            avatar_idx={this.props.avatar_order[1]}
            nextStep="AvatarDialog2"
          />
        );
      case 'AvatarDialog2':
        return (
          <AvatarDialog
            avatar_idx={this.props.avatar_order[1]}
            languages={Languages}
            nextStep="Game2"
          />
        );
      case 'Game2':
        return (
          <Game
            languages={Languages}
            avatar_idx={this.props.avatar_order[1]}
            nextStep="Exit"
          />
        );
      case 'Exit':
        return <Exit languages={Languages} />;
      default:
        return null;
    }
  }

  _renderHomeImage() {
    if (this.props.hasHomeImage) {
      return (
        <Pano
          style={{transform: [{rotateY: this.props.homeImageRotation}]}}
          source={asset(this.props.homeImage)}
        />
      );
    }
  }

  _renderAvatar() {
    if (this.props.gamePage === 8) {
      return <View />;
    } else {
      let firstAvatar = ['AvatarDialog1', 'CharacterIntro1', 'Game1'];
      let secondAvatar = ['AvatarDialog2', 'CharacterIntro2', 'Game2'];
      if (firstAvatar.includes(this.props.appStep)) {
        return <Avatars avatar_idx={this.props.avatar_order[0]} />;
      } else if (secondAvatar.includes(this.props.appStep)) {
        return <Avatars avatar_idx={this.props.avatar_order[1]} />;
      } else return <View />;
    }
  }

  _renderLight() {
    return <AmbientLight style={{color: 'white'}} intensity={1} />;
  }

  _renderLobby(): React$Element<any> {
    return (
      <View>
        {this._renderHomeImage()}
        {this._renderAvatar()}
        {this._renderLight()}
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
  homeImageRotation: appState.global.homeImageRotation,
  hasHomeImage: appState.global.hasHomeImage,
  appStep: appState.global.appStep,
  avatar_order: appState.global.avatar_order,
  gamePage: appState.game.gamePage,
});

export default typedConnect(mapStateToProps)(RootView);
