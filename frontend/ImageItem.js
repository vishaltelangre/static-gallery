import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames'

export default class ImageItem extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return <li>
      <div className="view">
        {this.props.image.get('title')}
        <img src={'images/' + this.props.image.get('images').get('small')} alt=""/>
      </div>
    </li>
  }
}
