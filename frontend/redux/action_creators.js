export function changeFilterType(filterType) {
  return {
    type: 'CHANGE_FILTER_TYPE',
    filterType
  }
}

export function changeFilterValue(filterValue) {
  return {
    type: 'CHANGE_FILTER_VALUE',
    filterValue
  }
}
