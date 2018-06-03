/**
 * Misc
 *
 * @flow
 * @format
 */

'use strict';

// STUDY SWITCH POINT
import type { KnownActions } from '../Study1/redux/RootReduxStore';
// import type { KnownActions } from '../Study2/redux/RootReduxStore';
// import type { KnownActions } from '../Study3/redux/RootReduxStore';
// STUDY SWITCH POINT
import RootReduxStore from '../Study1/redux/RootReduxStore';
// import RootReduxStore from '../Study2/redux/RootReduxStore';
// import RootReduxStore from '../Study3/redux/RootReduxStore';

import * as React from 'react';

export function dispatch(action: any) {
  RootReduxStore.dispatch(action);
}

const { connect } = require('react-redux');

// Combines props passed to the component by its parent plus state computed ones
type mapStateToProps<StoreState, OwnProps, Props> = (
  state: StoreState,
  ownProps: OwnProps
) => Props;

// The function that gets returned from calling typedConnect.
// It receives a Component and returns the Connected one with mapStateToProps
type connector<OwnProps, ComponentState> = (
  component:
    | Class<React.Component<any, ComponentState>>
    | ((props: any) => ?React$Element<any>)
) => Class<React.Component<OwnProps, ComponentState>>;

// $FlowFixMe
export function typedConnect<StoreState, OwnProps, Props, ComponentState>(
  mapStateToProps: mapStateToProps<StoreState, OwnProps, Props>
): connector<OwnProps, ComponentState> {
  return connect(mapStateToProps);
}
