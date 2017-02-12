import {Map} from 'immutable';

 function setState(state, newState) {
   return state.merge(newState);
 }

function changeFilter(state, filter) {
  return state.set('filter', filter);
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'CHANGE_FILTER':
      return changeFilter(state, action.filter);
  }

  return state;
}
