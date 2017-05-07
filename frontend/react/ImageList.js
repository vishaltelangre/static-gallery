import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ImageListItem from './ImageListItem'

export default class ImageList extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (<section>
      <ul className="imageList"
          style={{marginLeft: (document.body.clientWidth - (256+10)*4)*0.5}}>
        {this.props.filteredItems.map(image =>
          <ImageListItem key={image.get('slug')}
                         image={image} />
        )}
      </ul>
    </section>)
  }
}
