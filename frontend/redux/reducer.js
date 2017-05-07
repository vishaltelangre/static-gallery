import {Map, List} from 'immutable'

 function setState(state, newState) {
   return state.merge(newState)
 }

function changeFilterType(state, filterType) {
  return state.set('filterType', filterType).set('filterValue', 'All')
}

function changeFilterValue(state, filterValue) {
  return state.set('filterValue', filterValue)
}

export function filteredItems(state) {
  const filterType = state.get('filterType')
  const filterValue = state.get('filterValue')
  const items = state.get('items')

  let _filteredItems = state.get('items') || List([])

  if (items) {
    if (filterType !== 'All' && filterValue !== 'All') {
      if (filterType == 'Album') {
        _filteredItems = items.filter(image => {
          return image.get('albums').findIndex(album => album == filterValue) > -1
        })
      } else if (filterType == 'Category') {
        _filteredItems = items.filter(image => image.get('category') == filterValue)
      } else if (filterType == 'Tag') {
        _filteredItems = items.filter(image => {
          return image.get('tags').findIndex(tag => tag == filterValue) > -1
        })
      }
    }
  }

  return _filteredItems
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
