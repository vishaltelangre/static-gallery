import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ImageItem from './ImageItem'

export default class ImageList extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  getItems() {
    if (this.props.images) {
      return this.props.images
    }
    return []
  }

  render() {
    return <section>
      <h1>Vishal Telangre Photography</h1>
      <ul className="imageList">
        {this.getItems().map(image =>
          <ImageItem key={image.get('slug')} image={image}/>
        )}
      </ul>
    </section>
  }
}
