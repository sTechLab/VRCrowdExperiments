/**
 * Avatars
 *
 * @flow
 * @format
 */

'use strict';
import {Model, View, asset} from 'react-vr';
import React, {Component} from 'react';
import type {AppState} from '../redux/RootReduxStore';
import {dispatch} from '../../redux/Misc';
import {typedConnect} from '../../redux/Misc';

import {AVATAR_PATH, AVATAR_NAMES, getAvatarTranforms} from '../Configs';

type OwnProps = {};
type ReduxProps = {
  condition: string,
  poses: Array<any>,
  locations: Array<any>,
  orientations: Array<string>,
};

type Props = OwnProps & ReduxProps;
type OwnState = {
  transforms: Array<any>,
};

class Avatars extends Component<Props, OwnState> {
  props: Props;
  state: OwnState;

  constructor(props: Props) {
    super(props);
    this.state = {transforms: getAvatarTranforms(this.props.orientations)};
  }

  componentWillUnmount() {
    dispatch({
      type: 'PUSH_USER_INPUT',
      key: 'orientations',
      value: this.props.orientations,
    });
    dispatch({
      type: 'PUSH_USER_INPUT',
      key: 'poses',
      value: this.props.poses,
    });
    dispatch({
      type: 'PUSH_USER_INPUT',
      key: 'locations',
      value: this.props.locations,
    });
  }

  _renderAvatar(
    avatar_idx: number,
    pose: string,
    location_idx: number,
  ): React$Element<any> {
    return (
      <Model
        key={avatar_idx}
        style={{transform: this.state.transforms[location_idx]}}
        source={{
          obj: asset(`${AVATAR_PATH}${AVATAR_NAMES[avatar_idx]}-${pose}.obj`),
          mtl: asset(`${AVATAR_PATH}${AVATAR_NAMES[avatar_idx]}-${pose}.mtl`),
        }}
      />
    );
  }

  _renderAvatars() {
    let views = [];
    for (let i = 0; i < AVATAR_NAMES.length; i++) {
      views.push(
        this._renderAvatar(i, this.props.poses[i], this.props.locations[i]),
      );
    }
    return views;
  }

  render(): React$Element<any> {
    return <View>{this._renderAvatars()}</View>;
  }
}

const mapStateToProps = (appState: AppState, props: OwnProps): ReduxProps => ({
  condition: appState.logger.condition,
  poses: appState.trackingSession.poses,
  locations: appState.trackingSession.locations,
  orientations: appState.trackingSession.orientations,
});

export default typedConnect(mapStateToProps)(Avatars);
