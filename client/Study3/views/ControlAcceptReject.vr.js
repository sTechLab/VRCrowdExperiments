/**
 * ControlAcceptReject
 *
 * @flow
 * @format
 */

import React from 'react';
import {View, VrButton, Text} from 'react-vr';
import {dispatch} from '../../redux/Misc';
import {typedConnect} from '../../redux/Misc';
import type {AppState} from '../redux/RootReduxStore';
import {
  DefaultHighlightView,
  StyleText,
  StyleWrapper,
} from '../../views/GenericUI.vr';

import {AR_FIELDS_MAP} from '../Configs';

type OwnProps = {
  avatar_idx: number,
};
type ReduxProps = {
  gamePage: number,
  ar1: boolean,
  ar2: boolean,
  ar3: boolean,
  ar4: boolean,
};

type Props = OwnProps & ReduxProps;
type OwnState = {
  target: string,
};

class ControlAcceptReject extends React.Component<Props, OwnState> {
  props: Props;
  state: OwnState;

  constructor(props: Props) {
    super(props);
    let key;
    if (this.props.gamePage === 2) {
      key = 0;
    } else {
      key = 1;
    }
    this.state = {
      target: AR_FIELDS_MAP[this.props.avatar_idx.toString()][key],
    };
  }

  _renderSelection(target: string) {
    let selected;
    if (this.props[target] === null) {
      selected = '';
    } else {
      if (this.props[target]) {
        selected = 'Accept';
      } else {
        selected = 'Reject';
      }
    }
    return (
      <View style={{marginLeft: 20}}>
        <Text style={StyleText.bigBody}>Your selection: {selected}</Text>
      </View>
    );
  }

  _renderAcceptButton() {
    return (
      <VrButton
        onClick={() =>
          dispatch({
            type: 'SET_AR_VALUE',
            target: this.state.target,
            value: true,
          })}>
        <DefaultHighlightView width={200} text={'Accept'} />
      </VrButton>
    );
  }

  _renderRejectButton() {
    return (
      <VrButton
        onClick={() =>
          dispatch({
            type: 'SET_AR_VALUE',
            target: this.state.target,
            value: false,
          })}>
        <DefaultHighlightView width={200} text={'Reject'} />
      </VrButton>
    );
  }

  _setApp() {
    if (this.props[this.state.target] != null) {
      dispatch({type: 'INCREMENT_GAME_PAGE'});
      dispatch({
        type: 'PUSH_USER_INPUT',
        key: this.state.target,
        value: this.props[this.state.target],
      });
    }
  }
  _renderConfirmButton() {
    return (
      <VrButton onClick={() => this._setApp()}>
        <DefaultHighlightView width={200} text={'Confirm'} />
      </VrButton>
    );
  }

  render() {
    return (
      <View style={{marginTop: 200}}>
        <View style={StyleWrapper.shortbody1}>
          <View
            style={{
              justifyContent: 'space-around',
              width: 500,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {this._renderAcceptButton()}
            {this._renderRejectButton()}
          </View>
        </View>

        <View style={StyleWrapper.shortbody2}>
          {this._renderSelection(this.state.target)}
        </View>

        <View style={StyleWrapper.footer}>
          <View style={{alignItems: 'center', marginTop: 20}}>
            {this._renderConfirmButton()}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (appState: AppState, props: OwnProps): ReduxProps => ({
  gamePage: appState.game.gamePage,
  ar1: appState.input.ar1,
  ar2: appState.input.ar2,
  ar3: appState.input.ar3,
  ar4: appState.input.ar4,
});

export default typedConnect(mapStateToProps)(ControlAcceptReject);
