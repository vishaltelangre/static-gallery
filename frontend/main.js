import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from './App'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import fetch from 'isomorphic-fetch'

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

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
