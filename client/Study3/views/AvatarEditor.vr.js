/**
 * AvatarEditor
 *
 * @flow
 * @format
 */

// Interface to make user think we are configuring their avatar
'use strict';

import React from 'react';
import {Text, View, StyleSheet, CylindricalPanel, VrButton} from 'react-vr';

import {
  DefaultHighlightView,
  StyleText,
  StyleScreen,
  StyleWrapper,
  SCREEN_RADIUS,
} from '../../views/GenericUI.vr';

import type {AppState} from '../redux/RootReduxStore';
import type {AppStepType} from '../redux/GlobalRedux';
import {dispatch} from '../../redux/Misc';
import {typedConnect} from '../../redux/Misc';

type OwnProps = {
  languages: Object,
  nextStep: AppStepType,
};

type ReduxProps = {};

type Props = OwnProps & ReduxProps;

type OwnState = {
  page: number,
  selectedGender: string,
  selectedAge: string,
};

class AvatarEditor extends React.Component<Props, OwnState> {
  props: Props;
  state: OwnState;

  constructor(props: Props) {
    super(props);
    this.state = {
      page: 0,
      selectedGender: '',
      selectedAge: '',
    };
  }

  componentWillMount() {
    dispatch({
      type: 'SET_HOME_IMAGE',
      homeImage: 'game-room.jpg',
      hasHomeImage: true,
      homeImageRotation: 0,
    });
  }

  componentWillUnmount() {
    dispatch({
      type: 'PUSH_USER_INPUT',
      key: 'selectedGender',
      value: this.state.selectedGender,
    });
    dispatch({
      type: 'PUSH_USER_INPUT',
      key: 'selectedAge',
      value: this.state.selectedAge,
    });
  }

  _handlePageClick() {
    if (this.state.page == 0) {
      if (this.state.selectedGender.length !== 0) {
        this.setState({page: this.state.page + 1});
      }
    } else {
      if (this.state.selectedAge.length !== 0) {
        dispatch({
          type: 'CHANGE_APP_STEP',
          appStep: this.props.nextStep,
        });
      }
    }
  }

  _renderMaleButton() {
    return (
      <VrButton onClick={() => this.setState({selectedGender: 'Male'})}>
        <DefaultHighlightView width={120} text={'Male'} />
      </VrButton>
    );
  }

  _renderFemaleButton() {
    return (
      <VrButton onClick={() => this.setState({selectedGender: 'Female'})}>
        <DefaultHighlightView width={120} text={'Female'} />
      </VrButton>
    );
  }

  _renderOtherButton() {
    return (
      <VrButton onClick={() => this.setState({selectedGender: 'Other'})}>
        <DefaultHighlightView width={120} text={'Other'} />
      </VrButton>
    );
  }

  _renderYoungButton() {
    return (
      <VrButton onClick={() => this.setState({selectedAge: 'Young'})}>
        <DefaultHighlightView width={120} text={'Young'} />
      </VrButton>
    );
  }

  _renderMiddleAgedButton() {
    return (
      <VrButton onClick={() => this.setState({selectedAge: 'Middle-Aged'})}>
        <DefaultHighlightView width={170} text={'Middle-Aged'} />
      </VrButton>
    );
  }

  _renderOldButton() {
    return (
      <VrButton onClick={() => this.setState({selectedAge: 'Old'})}>
        <DefaultHighlightView width={120} text={'Old'} />
      </VrButton>
    );
  }

  _renderButton() {
    let buttonText = '';
    switch (this.state.page) {
      case 0:
        buttonText = 'Next';
        break;
      case 1:
        buttonText = 'Finish';
        break;
      default:
        buttonText = '';
    }
    return (
      <VrButton onClick={() => this._handlePageClick()}>
        <DefaultHighlightView width={200} text={buttonText} />
      </VrButton>
    );
  }

  _renderSelectGender() {
    return (
      <View
        style={{
          justifyContent: 'space-around',
          width: 500,
          flex: 1,
          flexDirection: 'row',
        }}>
        {this._renderMaleButton()}
        {this._renderFemaleButton()}
        {this._renderOtherButton()}
      </View>
    );
  }

  _renderSelectAge() {
    return (
      <View
        style={{
          justifyContent: 'space-around',
          width: 500,
          flex: 1,
          flexDirection: 'row',
        }}>
        {this._renderYoungButton()}
        {this._renderMiddleAgedButton()}
        {this._renderOldButton()}
      </View>
    );
  }
  _renderSelectStatus(target: string) {
    return (
      <View style={{marginLeft: 20}}>
        <Text style={StyleText.bigBody}>Your selection: {target}</Text>
      </View>
    );
  }

  _renderBody() {
    const {languages} = this.props;
    return (
      <Text style={StyleSheet.flatten([StyleText.body, {margin: 20}])}>
        {languages.AVATAR_EDITOR_BODY}
      </Text>
    );
  }

  _renderSelect() {
    if (this.state.page === 0) {
      return (
        <View>
          <View
            style={StyleSheet.flatten([
              StyleWrapper.shortbody1,
              {alignItems: 'center', marginTop: 20},
            ])}>
            {this._renderSelectGender()}
          </View>
          <View style={StyleWrapper.shortbody2}>
            {this._renderSelectStatus(this.state.selectedGender)}
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View
            style={StyleSheet.flatten([
              StyleWrapper.shortbody1,
              {alignItems: 'center', marginTop: 20},
            ])}>
            {this._renderSelectAge()}
          </View>
          <View style={StyleWrapper.shortbody2}>
            {this._renderSelectStatus(this.state.selectedAge)}
          </View>
        </View>
      );
    }
  }

  _renderPanel() {
    return (
      <CylindricalPanel
        layer={StyleSheet.flatten([
          StyleScreen.gamePanel,
          {radius: SCREEN_RADIUS},
        ])}>
        <View style={StyleScreen.gameDarkScreen}>
          <View style={StyleWrapper.title}>
            <Text style={StyleText.h1}>Configure Your Avatar</Text>
          </View>
          <View style={StyleWrapper.shortbody}>{this._renderBody()}</View>
          {this._renderSelect()}
          <View style={StyleWrapper.footer}>
            <View style={{alignItems: 'center'}}>{this._renderButton()}</View>
          </View>
        </View>
      </CylindricalPanel>
    );
  }

  render() {
    return <View>{this._renderPanel()}</View>;
  }
}

const mapStateToProps = (
  appState: AppState,
  props: OwnProps,
): ReduxProps => ({});

export default typedConnect(mapStateToProps)(AvatarEditor);
