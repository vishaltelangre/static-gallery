import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'
import {filteredItems} from '../redux/reducer'
import FilterBar from './FilterBar'
import ImageList from './ImageList'

export class App extends Component {
  render() {
    return (
      <section>
        <h1>Vishal Telangre Photography</h1>
        <FilterBar {...this.props} />
        <ImageList {...this.props} />
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.get('items'),
    filteredItems: filteredItems(state),
    filters: state.get('filters'),
    filterType: state.get('filterType'),
    filterValue: state.get('filterValue')
  };
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App)
