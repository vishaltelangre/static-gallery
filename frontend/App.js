import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as actionCreators from './action_creators';
import ImageList from './ImageList'

export class App extends Component {
  render() {
    return (
      <div>
        <ImageList {...this.props} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    images: state.get('images')
  };
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App);
