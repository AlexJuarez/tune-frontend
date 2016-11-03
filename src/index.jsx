// @flow

import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

import Redbox from 'redbox-react';
import configureStore from './store/configureStore';
import App from './components/App';
import { loadState, saveState } from './store/localStorage';

const holderDiv = document.createElement('div');
holderDiv.classList.add('root');
document.body.appendChild(holderDiv);

require('./index.less');

const store = configureStore(loadState());
store.subscribe(() => {
  saveState(store.getState());
});

function render(Host: ReactClass<*>) {
  ReactDOM.render(
    <AppContainer errorReporter={Redbox}>
      <Host store={store} />
    </AppContainer>,
  holderDiv);
}

render(App);
