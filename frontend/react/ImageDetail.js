import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux';
import * as actionCreators from '../redux/action_creators'
import { Link } from 'react-router'
import {List} from 'immutable'
import {InfoItem} from './InfoItem'

class ImageDetail extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  getItems() {
    if (this.props.items) {
      return this.props.items
    }
    return List([])
  }

  getPrevNextItem() {
    const { slug } = this.props.params
    const items = this.getItems()
    const currentItemIndex = items.findIndex(item => item.get('slug') == slug)
    let prevItem = null
    let nextItem = null

    if (currentItemIndex !== 0) {
      prevItem = items.get(currentItemIndex - 1)
    }

    if (currentItemIndex !== (items.length - 1)) {
      nextItem = items.get(currentItemIndex + 1)
    }

    return {prevItem, nextItem}
  }

  render() {
    const { slug } = this.props.params
    const {prevItem, nextItem} = this.getPrevNextItem()
    const image = this.getItems().find(item => item.get('slug') == slug)

    if (!image) return null

    const exif = image.get('exif')

    return (
      <div className="imageDetail">
        <div className="navigation">
          <div className="wrap">
            { prevItem ? <Link to={`/${prevItem.get('slug')}`}
                               title={`Previous ← "${prevItem.get('title')}"`}>
                            <img src={`images/${prevItem.get('images').get('small')}`}
                                 alt={`images/${prevItem.get('title')}`} />
                         </Link>
                       : null
            }
          </div>
          <div className="backToList"
               style={{marginLeft: (document.body.clientWidth - 300)/2}}>
            <Link to="/">Back to Home</Link>
          </div>
          <div className="wrap right">
            {nextItem ? <Link to={`/${nextItem.get('slug')}`}
                              title={`Next → "${nextItem.get('title')}"`}>
                          <img src={`images/${nextItem.get('images').get('small')}`}
                               alt={`images/${nextItem.get('title')}`} />
                        </Link>
                      : null}
          </div>
        </div>

      <div>
        <div className="imageLarge"
             style={{width: document.body.clientWidth - (document.body.clientWidth*0.3)}}>
          <img src={`images/${image.get('images').get('large')}`} />
        </div>
        <div className="info" style={{ width: document.body.clientWidth*0.28,
                                       maxHeight: (window.innerHeight - 64),
                                       marginLeft: document.body.clientWidth*0.01 }}>
          <h2>{image.get('title')}</h2>
          <ul>
            <li className="seperator" />
            <InfoItem props={{label: 'Description', value: image.get('description')}} />
            <InfoItem props={{label: 'Place', value: image.get('place')}} />
            <InfoItem props={{label: 'Category', value: image.get('category')}} />
            <InfoItem props={{label: 'Tags', value: image.get('tags').join(', ')}} />
            <li className="seperator" />
            <li>
              <label><strong>EXIF</strong></label>
              <ul className="exif">
                <InfoItem props={{label: 'Make', value: exif.get('deviceMake'), inline: true}} />
                <InfoItem props={{label: 'Model', value: exif.get('deviceModel'), inline: true}} />
                <InfoItem props={{label: 'Exposure Time', value: exif.get('exposureTime'), inline: true}} />
                <InfoItem props={{label: 'F Number', value: exif.get('fNumber'), inline: true}} />
                <InfoItem props={{label: 'Exposure Program', value: exif.get('exposureProgram'), inline: true}} />
                <InfoItem props={{label: 'ISO', value: exif.get('iso'), inline: true}} />
                <InfoItem props={{label: 'Sensitivity Type', value: exif.get('sensitivityType'), inline: true}} />
                <InfoItem props={{label: 'Captured At', value: exif.get('createDate'), inline: true}} />
                <InfoItem props={{label: 'Shutter Speed', value: exif.get('shutterSpeedValue'), inline: true}} />
                <InfoItem props={{label: 'Aperture', value: exif.get('apertureValue'), inline: true}} />
                <InfoItem props={{label: 'Metering Mode', value: exif.get('meteringMode'), inline: true}} />
                <InfoItem props={{label: 'Flash', value: exif.get('flash'), inline: true}} />
                <InfoItem props={{label: 'Focal Length', value: exif.get('focalLength'), inline: true}} />
                <InfoItem props={{label: 'Color Space', value: exif.get('colorSpace'), inline: true}} />
                <InfoItem props={{label: 'Lens Model', value: exif.get('lensModel'), inline: true}} />
                <InfoItem props={{label: 'Lens Serial Number', value: exif.get('lensSerialNumber'), inline: true}} />
              </ul>
            </li>
          </ul>
        </div>
        <div className="clearfix" />
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return { items: state.get('items') }
}

export const ImageDetailContainer = connect(mapStateToProps, actionCreators)(ImageDetail)
