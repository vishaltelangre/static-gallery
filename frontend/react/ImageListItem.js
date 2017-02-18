import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

export default class ImageListItem extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return (
      <Link to={`/${this.props.image.get('slug')}`} className="imageListItem">
        <li>
          <img src={'images/' + this.props.image.get('images').get('small')}
              alt={this.props.image.get('title')}/>
          <p className="captionStrip">
            <span className="captionContent">{this.props.image.get('title')}</span>
          </p>
        </li>
      </Link>
    )
  }
}

// ImageListItem.PropTypes = {
//   image: React.PropTypes.any,
// }
