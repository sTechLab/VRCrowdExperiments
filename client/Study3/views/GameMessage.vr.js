/**
 * GameMessage
 *
 * @flow
 * @format
 */

import React from 'react';
import {Text, View, StyleSheet} from 'react-vr';
import {StyleText} from '../../views/GenericUI.vr';
import {getGameDescription} from '../StandardLanguage';
import type {AppState} from '../redux/RootReduxStore';
import {typedConnect} from '../../redux/Misc';

type OwnProps = {
  avatar_idx: number,
};

type ReduxProps = {
  gamePage: number,
  response: string,
  result: string,
};

type Props = OwnProps & ReduxProps;

type OwnState = {
  gameDesc: any,
};

class GameMessage extends React.Component<Props, OwnState> {
  props: Props;
  state: OwnState;

  constructor(props: Props) {
    super(props);
    this.state = {
      gameDesc: getGameDescription(this.props.avatar_idx),
    };
  }

  // displays the text for each view
  _renderMessage() {
    let returnBody;
    let messagePage = [0, 2, 4, 6];
    let roundResultPage = [1, 3, 5, 7];
    if (messagePage.includes(this.props.gamePage)) {
      returnBody = this.state.gameDesc[`${this.props.gamePage}`];
    } else {
      if (roundResultPage.includes(this.props.gamePage)) {
        returnBody = this.state.gameDesc[`${this.props.gamePage}`][
          this.props.response
        ];
      } else {
        returnBody = this.state.gameDesc[`${this.props.gamePage}`][
          this.props.result
        ];
      }
    }
    return (
      <Text
        style={StyleSheet.flatten([
          StyleText.body,
          {margin: 20, marginBottom: 20},
        ])}>
        {returnBody}
      </Text>
    );
  }

  render() {
    return <View>{this._renderMessage()}</View>;
  }
}

const mapStateToProps = (appState: AppState, props: OwnProps): ReduxProps => ({
  gamePage: appState.game.gamePage,
  response: appState.game.response,
  result: appState.game.result,
});

export default typedConnect(mapStateToProps)(GameMessage);
