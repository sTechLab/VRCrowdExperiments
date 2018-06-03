/**
 * Keyboard UI Component
 *
 * @flow
 * @format
 */

'use strict';

import React, {Component} from 'react';
import {View, VrButton} from 'react-vr';
import {HighlightView} from './GenericUI.vr';
import {dispatch} from '../redux/Misc';
import {typedConnect} from '../redux/Misc';

type KeyProps = {
  value: string,
  onClickAction: Function,
  width?: number,
};

type KeyState = {
  gazeEnabled: boolean,
};

export const KEY_HEIGHT = 55;

class Key extends Component<KeyProps, KeyState> {
  props: KeyProps;
  state: KeyState;

  constructor(props: KeyProps) {
    super(props);
    this.state = {
      gazeEnabled: false,
    };
  }

  _renderHighlightView(key_width: number): React$Element<any> {
    return (
      <HighlightView
        width={key_width}
        height={KEY_HEIGHT}
        text={this.props.value}
        backgroundColor="rgba(0, 0, 0, 0.7)"
        borderColor="rgba(255, 255, 255, 0.7)"
      />
    );
  }

  render(): React$Element<any> {
    let key_width: number = this.props.width ? this.props.width : KEY_HEIGHT;
    return (
      <VrButton onClick={this.props.onClickAction}>
        {this._renderHighlightView(key_width)}
      </VrButton>
    );
  }
}

type KeyboardProps = {
  target: string,
};

export class Keyboard extends Component<KeyboardProps> {
  props: KeyboardProps;

  constructor(props: KeyboardProps) {
    super(props);
  }

  _setTarget(value: string): void {
    dispatch({
      type: 'APPEND_INPUT_VALUE',
      target: this.props.target,
      value: value,
    });
  }

  _backspace(): void {
    dispatch({type: 'BACKSPACE', target: this.props.target});
  }

  render(): React$Element<any> {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            margin: 0,
            flex: 1,
            flexDirection: 'row',
          }}>
          <Key value="1" onClickAction={() => this._setTarget('1')} />
          <Key value="2" onClickAction={() => this._setTarget('2')} />
          <Key value="3" onClickAction={() => this._setTarget('3')} />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <Key value="4" onClickAction={() => this._setTarget('4')} />
          <Key value="5" onClickAction={() => this._setTarget('5')} />
          <Key value="6" onClickAction={() => this._setTarget('6')} />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <Key value="7" onClickAction={() => this._setTarget('7')} />
          <Key value="8" onClickAction={() => this._setTarget('8')} />
          <Key value="9" onClickAction={() => this._setTarget('9')} />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <Key value="0" onClickAction={() => this._setTarget('0')} />
          <Key
            value="Del"
            width={KEY_HEIGHT * 2}
            onClickAction={() => this._backspace()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (appState: any, props: any): any => ({
  input1: appState.input.input1,
  input2: appState.input.input2,
  input3: appState.input.input3,
  input4: appState.input.input4,
});

export default typedConnect(mapStateToProps)(Keyboard);
