import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class FilterBar extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  onFilterTypeChange(event) {
    this.props.changeFilterType(event.target.value)
  }

  onFilterValueChange(event) {
    this.props.changeFilterValue(event.target.value)
  }

  renderFilterTypeOptions() {
    const filters = this.props.filters
    if (!filters) return null
    return filters.keySeq()
                  .toArray()
                  .map(filterType => <option key={filterType}
                                             value={filterType}>
                                        {filterType}
                                      </option>)
  }

  renderFilterValueOptions() {
    const filters = this.props.filters
    if (!filters) return null
    return filters.get(this.props.filterType)
                  .map(filterValue => <option key={filterValue}
                                             value={filterValue}>
                                        {filterValue}
                                      </option>)
  }

  render() {
    return (<section className="filterBar">
      <div className="filter">
        <span>Filter</span>
        <select value={this.props.filterType}
                onChange={this.onFilterTypeChange.bind(this)}>
          <option value="All">-- All --</option>
          {this.renderFilterTypeOptions()}
        </select>
      </div>
      {
        this.props.filterType != 'All'
          ? <div className="filter">
              <span>With</span>
              <select value={this.props.filterValue}
                    onChange={this.onFilterValueChange.bind(this)}>
                <option value="All">-- All --</option>
                {this.renderFilterValueOptions()}
              </select>
            </div>
          : null
      }
    </section>)
  }
}

// FilterBar.propTypes = {
//   changeFilterType: React.PropTypes.func.isRequired,
//   changeFilterValue: React.PropTypes.func.isRequired,
//   filters: React.PropTypes.any,
//   filterType: React.PropTypes.string,
//   filterValue: React.PropTypes.string,
// }
