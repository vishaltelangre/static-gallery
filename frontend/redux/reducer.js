import {Map} from 'immutable'

 function setState(state, newState) {
   return state.merge(newState)
 }

function changeFilterType(state, filterType) {
  return state.set('filterType', filterType).set('filterValue', 'All')
}

function changeFilterValue(state, filterValue) {
  return state.set('filterValue', filterValue)
}

export default function (state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state)
    case 'CHANGE_FILTER_TYPE':
      return changeFilterType(state, action.filterType)
    case 'CHANGE_FILTER_VALUE':
      return changeFilterValue(state, action.filterValue)
  }

  return state
}
