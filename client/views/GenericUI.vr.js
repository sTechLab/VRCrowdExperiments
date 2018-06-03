/**
 * GenericUI
 *
 * @flow
 * @format
 */

'use strict';

import {StyleSheet} from 'react-vr';
import React, {Component} from 'react';
import {Text, View} from 'react-vr';

type HighlightViewProps = {
  style?: Object,
  height?: number,
  width?: number,
  backgroundColor?: string,
  borderColor?: string,
  borderRadius?: number,
  opacity?: number,
  text?: string,
  highlightBackgroundColor?: string,
};

type HighlightViewState = {
  gazeEnabled: boolean,
};

export class HighlightView extends Component<
  HighlightViewProps,
  HighlightViewState,
> {
  props: HighlightViewProps;
  state: HighlightViewState;

  constructor(props: HighlightViewProps) {
    super(props);
    this.state = {
      gazeEnabled: false,
    };
  }

  render(): React$Element<any> {
    return (
      <View
        style={{
          height: this.props.height,
          width: this.props.width,
          backgroundColor: this.state.gazeEnabled
            ? this.props.highlightBackgroundColor
              ? this.props.highlightBackgroundColor
              : 'rgba(255, 255, 255, 0.5)'
            : this.props.backgroundColor,
          borderWidth: 2,
          borderColor: this.state.gazeEnabled
            ? '#FFFFFF'
            : this.props.borderColor,
          opacity: this.props.opacity,
          borderRadius: this.props.borderRadius,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onEnter={() => this.setState({gazeEnabled: true})}
        onExit={() => this.setState({gazeEnabled: false})}>
        <Text style={StyleText.body}>{this.props.text}</Text>
      </View>
    );
  }
}

export class DefaultHighlightView extends Component<HighlightViewProps> {
  props: HighlightViewProps;

  constructor(props: HighlightViewProps) {
    super(props);
  }

  render(): React$Element<any> {
    let width: number = this.props.width ? this.props.width : 300;
    return (
      <HighlightView
        height={70}
        width={width}
        text={this.props.text}
        backgroundColor={'rgba(0, 0, 0, 0.7)'}
        highlightBackgroundColor={'rgba(255, 0, 0, 0.7)'}
        borderColor={'rgba(255, 255, 255, 0.7)'}
      />
    );
  }
}
export const SCREEN_WIDTH = 900;
export const SCREEN_HEIGHT = 500;
export const SCREEN_RADIUS = 400;

export const StyleWrapper = StyleSheet.create({
  title: {
    height: 60,
    backgroundColor: 'rgba(0, 255, 0, 0.0)',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  byline: {
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  longbody: {
    height: 320,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  body: {
    height: 270,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  shortbody: {
    height: 150,
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  shortbody1: {
    height: 90,
    backgroundColor: 'rgba(0, 0, 255, 0.0)',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  shortbody2: {
    height: 80,
    backgroundColor: 'rgba(0, 255, 0, 0.0)',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  footer: {
    height: 90,
    backgroundColor: 'rgba(0, 0, 255, 0.0)',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

export const StyleText = StyleSheet.create({
  h1: {
    fontSize: 46,
    color: '#66CCFF',
    fontWeight: 'bold',
    position: 'relative',
    textAlign: 'center',
  },
  h2: {
    fontSize: 35,
    color: '#CCFFCC',
    fontWeight: 'bold',
    position: 'relative',
    textAlign: 'center',
  },
  body: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
  bigBody: {
    fontSize: 35,
    color: '#CCFFCC',
    fontWeight: '600',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  warning: {
    fontSize: 35,
    color: '#FF6600',
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 1,
    paddingBottom: 1,
  },
  label: {
    fontSize: 35,
    color: '#FF6600',
    fontWeight: '600',
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export const StyleScreen = StyleSheet.create({
  panel: {
    // style for the CylindricalPanel
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  darkScreen: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    flex: 1,
    flexDirection: 'column',
  },
  gamePanel: {
    width: SCREEN_WIDTH * 2 / 3,
    height: SCREEN_HEIGHT,
  },
  gameDarkScreen: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: SCREEN_WIDTH * 2 / 3,
    height: SCREEN_HEIGHT,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  clearScreen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});

const LDB_CELL_HEIGHT = 60;
const LDB_CELL_WIDTH = 150;

export const StyleLDB = StyleSheet.create({
  panel: {
    width: LDB_CELL_WIDTH * 2,
    height: LDB_CELL_HEIGHT * 2,
  },
  screen: {
    width: LDB_CELL_WIDTH * 2,
    height: LDB_CELL_HEIGHT * 2,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cell: {
    height: LDB_CELL_HEIGHT,
    width: LDB_CELL_WIDTH,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export const StyleAvatar = StyleSheet.create({
  // scale = short makes the avatar look noticably and acceptably shorter
  // at scale = normal, the eyes of the avatar are approx. at the eye level of the VR user
  // scale = tall makes the avatar taller but in an acceptable range even in real life
  // the condition is the reverse for avatar size
  // condition 'short' -> maps to a tall avatar
  Short: {
    transform: [{translate: [90, -100, -200]}, {rotateY: -1}, {scale: 1.1}],
  },

  Normal: {
    transform: [{translate: [90, -100, -200]}, {rotateY: -1}, {scale: 0.75}],
  },
  Tall: {
    transform: [{translate: [90, -100, -150]}, {rotateY: -1}, {scale: 0.4}],
  },
});
