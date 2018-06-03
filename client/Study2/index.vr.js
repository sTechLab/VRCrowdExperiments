/*
Root UI component for the app
@flow
@format
*/

'use strict';

import App from './views/App.vr';
import * as React from 'react';
import {AppRegistry} from 'react-vr';
import {Provider} from 'react-redux';
import RootReduxStore from './redux/RootReduxStore';

export default class Study2 extends React.Component<{}> {
  render() {
    return (
      <Provider store={RootReduxStore}>
        <App />
      </Provider>
    );
  }
}
