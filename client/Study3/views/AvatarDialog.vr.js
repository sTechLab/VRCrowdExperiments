/**
 * AvatarDialog
 *
 * @flow
 * @format
 */

// A simple dialog to introduce the avatar and serve as manipulation check
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
  avatar_idx: number,
};

type ReduxProps = {};

type Props = OwnProps & ReduxProps;

type OwnState = {
  page: number,
  selectedLoad: string,
  selectedGaze: string,
  selectedGender: string,
};

class AvatarDialog extends React.Component<Props, OwnState> {
  props: Props;
  state: OwnState;

  constructor(props: Props) {
    super(props);
    this.state = {
      page: 0,
      selectedLoad: '',
      selectedGaze: '',
      selectedGender: '',
    };
  }

  componentWillMount() {
    if (this.props.nextStep === 'Game2') {
      this.setState({page: this.state.page + 1});
    }
  }

  componentWillUnmount() {
    dispatch({
      type: 'PUSH_USER_INPUT',
      key: `selectedLoad-avatar${this.props.avatar_idx}`,
      value: this.state.selectedLoad,
    });
    dispatch({
      type: 'PUSH_USER_INPUT',
      key: `selectedGaze-avatar${this.props.avatar_idx}`,
      value: this.state.selectedGaze,
    });
    dispatch({
      type: 'PUSH_USER_INPUT',
      key: `selectedGender-avatar${this.props.avatar_idx}`,
      value: this.state.selectedGender,
    });
  }

  _handlePageClick() {
    switch (this.state.page) {
      case 0:
        this.setState({page: this.state.page + 1, selectedLoad: 'Yes'});
        break;
      case 1:
        if (this.state.selectedGaze.length !== 0) {
          this.setState({page: this.state.page + 1});
        }
        break;
      case 2:
        if (this.state.selectedGender.length !== 0) {
          dispatch({
            type: 'CHANGE_APP_STEP',
            appStep: this.props.nextStep,
          });
        }
        break;

      default:
    }
  }

  _renderBody() {
    const {languages} = this.props;
    let bodyText;
    switch (this.state.page) {
      case 0:
        return (
          <View
            style={StyleSheet.flatten([
              StyleWrapper.longbody,
              {marginTop: 20},
            ])}>
            <Text style={StyleSheet.flatten([StyleText.body, {margin: 20}])}>
              {languages.AVATAR_DIALOG_BODY}
            </Text>
          </View>
        );
      case 1:
        bodyText = "Is your opponent's avatar looking at your direction?";
        return (
          <View
            style={StyleSheet.flatten([
              StyleWrapper.shortbody1,
              {marginTop: 20},
            ])}>
            <Text style={StyleSheet.flatten([StyleText.body, {margin: 20}])}>
              {bodyText}
            </Text>
          </View>
        );
      case 2:
        bodyText = "What's the gender of your opponent's avatar?";
        return (
          <View
            style={StyleSheet.flatten([
              StyleWrapper.shortbody1,
              {marginTop: 20},
            ])}>
            <Text style={StyleSheet.flatten([StyleText.body, {margin: 20}])}>
              {bodyText}
            </Text>
          </View>
        );
      default:
    }
  }

  _renderSelectStatus(target: string) {
    return (
      <View style={{marginLeft: 20}}>
        <Text style={StyleText.bigBody}>Your selection: {target}</Text>
      </View>
    );
  }

  _renderYesButton() {
    return (
      <VrButton onClick={() => this.setState({selectedGaze: 'Yes'})}>
        <DefaultHighlightView width={120} text={'Yes'} />
      </VrButton>
    );
  }

  _renderNoButton() {
    return (
      <VrButton onClick={() => this.setState({selectedGaze: 'No'})}>
        <DefaultHighlightView width={120} text={'No'} />
      </VrButton>
    );
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

  _renderSelectGaze() {
    return (
      <View
        style={{
          justifyContent: 'space-around',
          width: 500,
          flex: 1,
          flexDirection: 'row',
        }}>
        {this._renderYesButton()}
        {this._renderNoButton()}
      </View>
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

  _renderSelect() {
    if (this.state.page === 0) {
      return <View />;
    } else if (this.state.page === 1) {
      return (
        <View>
          <View
            style={StyleSheet.flatten([
              StyleWrapper.shortbody1,
              {alignItems: 'center', marginTop: 20},
            ])}>
            {this._renderSelectGaze()}
          </View>
          <View style={StyleWrapper.shortbody2}>
            {this._renderSelectStatus(this.state.selectedGaze)}
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
            {this._renderSelectGender()}
          </View>
          <View style={StyleWrapper.shortbody2}>
            {this._renderSelectStatus(this.state.selectedGender)}
          </View>
        </View>
      );
    }
  }

  _renderButton() {
    let buttonText = '';
    switch (this.state.page) {
      case 0:
        buttonText = 'Yes';
        break;
      case 1:
        buttonText = 'Next';
        break;
      case 2:
        buttonText = "Let's Play!";
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

  _renderPanel() {
    return (
      <CylindricalPanel
        style={{transform: [{rotateY: -20}]}}
        layer={StyleSheet.flatten([
          StyleScreen.gamePanel,
          {radius: SCREEN_RADIUS},
        ])}>
        <View style={StyleScreen.gameDarkScreen}>
          <View style={StyleWrapper.title}>
            <Text style={StyleText.h1}>Meet Your Opponent</Text>
          </View>
          {this._renderBody()}
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

export default typedConnect(mapStateToProps)(AvatarDialog);
