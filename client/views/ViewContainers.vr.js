/**
 * ViewContainers
 *
 * @flow
 *
 */

'use strict';

import React, { Component } from 'react';
import { View } from 'react-vr';

type ContainerProps = {
  children?: React$Node,
  ratio?: number,
};

export class GenericContainer extends Component<ContainerProps> {
  props: ContainerProps;

  constructor(props: ContainerProps) {
    super(props);
  }

  render(): React$Element<any> {
    return (
      <View
        style={{
          flex: this.props.ratio || 1,
        }}
      >
        {this.props.children}
      </View>
    );
  }
}

/*
 *
 *  Create a skeleton of view containers:
 *  Assume range the UI with vertical as main axis:
 *  * Header: 1
 *  * Body:   3
 *  * Footer: 1
 */
export class Header extends Component<ContainerProps> {
  render(): React$Element<any> {
    return (
      <GenericContainer ratio={this.props.ratio || 1}>
        {this.props.children}
      </GenericContainer>
    );
  }
}

export class Body extends Component<ContainerProps> {
  render(): React$Element<any> {
    return (
      <GenericContainer ratio={this.props.ratio || 3}>
        {this.props.children}
      </GenericContainer>
    );
  }
}

export class Footer extends Component<ContainerProps> {
  render(): React$Element<any> {
    return (
      <GenericContainer ratio={this.props.ratio || 1}>
        {this.props.children}
      </GenericContainer>
    );
  }
}
