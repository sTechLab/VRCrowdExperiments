/**
 * Animal
 *
 * @flow
 * @format
 */

'use strict';
import {Model, View, asset, VrButton} from 'react-vr';
import React, {Component} from 'react';

import type {AppState} from '../redux/RootReduxStore';
import {dispatch} from '../../redux/Misc';
import {typedConnect} from '../../redux/Misc';

type OwnProps = {};

type ReduxProps = {
  caught_fox: boolean,
};

type Props = OwnProps & ReduxProps;
type OwnState = {
  gazeEnabled: boolean,
};

class Animal extends Component<Props, OwnState> {
  props: Props;
  state: OwnState;

  constructor(props: Props) {
    super(props);
    this.state = {gazeEnabled: false};
  }

  _renderFox() {
    return (
      <Model
        style={{
          transform: [{scale: this.state.gazeEnabled ? 0.9 : 0.5}],
        }}
        source={{
          obj: asset('fox.obj'),
          mtl: asset('fox.mtl'),
        }}
      />
    );
  }

  _renderWrapper() {
    return (
      <VrButton
        style={{
          transform: [{translate: [600, 300, -400]}],
        }}
        onEnter={() => this.setState({gazeEnabled: true})}
        onExit={() => this.setState({gazeEnabled: false})}
        onClick={() => dispatch({type: 'CATCH_FOX'})}>
        {this._renderFox()}
      </VrButton>
    );
  }
  render() {
    return <View>{this._renderWrapper()}</View>;
  }
}

const mapStateToProps = (appState: AppState, props: OwnProps): ReduxProps => ({
  caught_fox: appState.trackingSession.caught_fox,
});

export default typedConnect(mapStateToProps)(Animal);
