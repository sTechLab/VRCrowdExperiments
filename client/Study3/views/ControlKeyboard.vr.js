/**
 * ControlKeyboard
 *
 * @flow
 * @format
 */

import React from 'react';
import {View, Text, VrButton} from 'react-vr';

import type {AppState} from '../redux/RootReduxStore';
import {dispatch} from '../../redux/Misc';
import {typedConnect} from '../../redux/Misc';

import {Keyboard, KEY_HEIGHT} from '../../views/Keyboard.vr';
import {splitValidator} from '../../utils/ExperimentUtils';
import {DefaultHighlightView, StyleText} from '../../views/GenericUI.vr';

import {AVATAR_DISPLAY_NAMES, INPUT_FIELDS_MAP} from '../Configs';

type OwnProps = {
  avatar_idx: number,
};

type ReduxProps = {
  gamePage: number,
  split1: string,
  split2: string,
  split3: string,
  split4: string,
};

type Props = OwnProps & ReduxProps;
type OwnState = {
  target: string,
};

class ControlKeyboard extends React.Component<Props, OwnState> {
  props: Props;
  state: OwnState;

  constructor(props: Props) {
    super(props);
    let key;
    if (this.props.gamePage === 0) {
      key = 0;
    } else {
      key = 1;
    }
    this.state = {
      target: INPUT_FIELDS_MAP[this.props.avatar_idx.toString()][key],
    };
  }

  _confirmKeyboard(target: string) {
    if (splitValidator(this.props[target])) {
      dispatch({type: 'INCREMENT_GAME_PAGE'});
      dispatch({
        type: 'PUSH_USER_INPUT',
        key: target,
        value: this.props[target],
      });
    }
  }

  _renderKeyboard(target: string) {
    let youAmount;
    if (this.props[target].length === 0) {
      youAmount = '$';
    } else {
      if (parseInt(this.props[target]) > 100) {
        youAmount = 'Out of range';
      } else {
        youAmount = '$' + (100 - parseInt(this.props[target])).toString();
      }
    }

    return (
      <View>
        <View style={{position: 'absolute', marginLeft: 20}}>
          <Text style={StyleText.bigBody}>
            {AVATAR_DISPLAY_NAMES[this.props.avatar_idx]}: ${this.props[target]}
            {'\n\n'}
            You: {youAmount}
          </Text>
          <VrButton
            style={{marginTop: 20}}
            onClick={() => this._confirmKeyboard(target)}>
            <DefaultHighlightView width={250} text={'Confirm'} />
          </VrButton>
        </View>
        <View
          style={{
            height: KEY_HEIGHT * 4,
            position: 'absolute',
            right: 30,
            top: -10,
          }}>
          <Keyboard target={target} />
        </View>
      </View>
    );
  }

  render() {
    return <View>{this._renderKeyboard(this.state.target)}</View>;
  }
}

const mapStateToProps = (appState: AppState, props: OwnProps): ReduxProps => ({
  gamePage: appState.game.gamePage,
  split1: appState.input.split1,
  split2: appState.input.split2,
  split3: appState.input.split3,
  split4: appState.input.split4,
});

export default typedConnect(mapStateToProps)(ControlKeyboard);
