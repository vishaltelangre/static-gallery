import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from './App'
import {ImageDetailContainer} from './ImageDetail'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import fetch from 'isomorphic-fetch'
import { Router, Route, browserHistory } from 'react-router';

if (console && console.log) {
  console.log('Alright! I am impressed by your extra-hacking skills! Call me maybe...')
}

const store = createStore(reducer);

fetch('data.json')
.then(response => response.json())
.then(json => {
  store.dispatch({
    type: 'SET_STATE',
    state: {
      images: json,
      filter: 'all'
    }
  });
})

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} />
      <Route path="/:slug" component={ImageDetailContainer} />
    </Router>
  </Provider>
);

render(<Root store={store} />, document.getElementById('root'))
