/**
 * Avatars
 *
 * @flow
 * @format
 */

'use strict';

import React from 'react';
import {asset, View, Model, PointLight, Pano} from 'react-vr';

import {StyleAvatar} from '../../views/GenericUI.vr';
import type {AppState} from '../redux/RootReduxStore';
import {dispatch} from '../../redux/Misc';
import {typedConnect} from '../../redux/Misc';

import {DEV, AVATAR_NAMES, AVATAR_DISPLAY_NAMES} from '../Configs';

type OwnProps = {
  avatar_idx: number,
};

type ReduxProps = {
  condition: string,
};

type Props = OwnProps & ReduxProps;
type OwnState = {};

class Avatars extends React.Component<Props, OwnState> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  _renderFBXModel(
    name: string,
    play: boolean,
    speed: number,
  ): React$Element<any> {
    return (
      <Model
        source={{
          fbx: asset(name),
          animations: {
            play: play,
            timeScale: speed,
          },
        }}
        lit={true}
      />
    );
  }

  // select which model to use
  _renderAvatar(avatar_idx: number) {
    return (
      <View>
        {this._renderFBXModel(`${AVATAR_NAMES[avatar_idx]}.fbx`, true, 1)}
      </View>
    );
  }

  // this following method deals with positioning and scaling of the models
  _renderSizedAvatar() {
    return (
      <View style={StyleAvatar[this.props.condition]}>
        {this._renderAvatar(this.props.avatar_idx)}
      </View>
    );
  }

  render(): React$Element<any> {
    return (
      <View style={{transform: [{rotateY: 40}]}}>
        {this._renderSizedAvatar()}
      </View>
    );
  }
}

const mapStateToProps = (appState: AppState, props: OwnProps): ReduxProps => ({
  appStep: appState.global.appStep,
  condition: appState.logger.condition,
});

export default typedConnect(mapStateToProps)(Avatars);
