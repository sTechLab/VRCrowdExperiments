/**
 * Exit View
 *
 * @flow
 * @format
 */

'use strict';

import React from 'react';
import {
  asset,
  Text,
  View,
  VideoPano,
  StyleSheet,
  CylindricalPanel,
  VrButton,
} from 'react-vr';

import {
  HighlightView,
  StyleText,
  StyleScreen,
  StyleWrapper,
} from './GenericUI.vr';

import {dispatch} from '../redux/Misc';
import {typedConnect} from '../redux/Misc';

type OwnProps = {
  languages: Object,
};

type ReduxProps = {
  appStep: any,
  userID: string,
};

type Props = OwnProps & ReduxProps;

class Exit extends React.Component<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  _renderBody() {
    return (
      <View style={{marginLeft: 20, marginBottom: 20}}>
        <Text style={StyleText.body}>{this.props.languages.EXIT_BODY}</Text>
      </View>
    );
  }
  _renderPanel() {
    return (
      <CylindricalPanel
        layer={StyleSheet.flatten([StyleScreen.panel, {radius: 400}])}>
        <View style={StyleScreen.darkScreen}>
          <View style={StyleWrapper.title}>
            <Text style={StyleText.h1}>
              {this.props.languages.EXIT_TITLE} {this.props.userID}
            </Text>
          </View>

          <View style={StyleWrapper.body}>{this._renderBody()}</View>
        </View>
      </CylindricalPanel>
    );
  }

  render(): React$Element<any> {
    return this._renderPanel();
  }
}

const mapStateToProps = (appState: any, props: OwnProps): ReduxProps => ({
  appStep: appState.global.appStep,
  userID: appState.logger.userID,
});

export default typedConnect(mapStateToProps)(Exit);
