import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ImageListItem from './ImageListItem'

export default class ImageList extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  getItems() {
    let items = []

    if (this.props.items) {
      const { filterType, filterValue } = this.props
      items = this.props.items

      if (filterType !== 'All' && filterValue !== 'All') {
        if (filterType == 'Album') {
          items = items.filter(image => {
            return image.get('albums').findIndex(album => album == filterValue) > -1
          })
        } else if (filterType == 'Category') {
          items = items.filter(image => {
            return image.get('category') == filterValue
          })
        } else if (filterType == 'Tag') {
          items = items.filter(image => {
            return image.get('tags').findIndex(tag => tag == filterValue) > -1
          })
        }
        return items
      }
    }
    return items
  }

  render() {
    return (<section>
      <ul className="imageList"
          style={{marginLeft: (document.body.clientWidth - (256+10)*4)*0.5}}>
        {this.getItems().map(image =>
          <ImageListItem key={image.get('slug')}
                         image={image} />
        )}
      </ul>
    </section>)
  }
}

// ImageList.PropTypes = {
//   items: React.PropTypes.object,
//   filterType: React.PropTypes.string,
//   filterValue: React.PropTypes.string
// }
