const fs = require('fs')
const path = require('path')
const uuid = require('node-uuid')

class InfoFileParser {
  constructor(filePath, options = {}) {
    this.filePath = filePath
    this.defaultInfo = Object.assign({
      "id": uuid.v4(),
      "title": this.getDefaultTitle(),
      "description": null,
      "place": null,
      "albums": ["My Best Clicks"],
      "category": "Uncategorized",
      "tags": [],
      "images": {},
    }, options)
    this.info = this.defaultInfo
  }

  getDefaultTitle() {
    return path.basename(this.filePath, path.extname(this.filePath))
               .replace(/-|_/g, ' ')
  }

  process() {
    const buffer = fs.readFileSync(this.filePath)
    const parsedInfo = {}

    Object.keys(this.defaultInfo).forEach(attribute => {
      const regex = new RegExp(`${attribute}:([^]*?)--`, 'i')
      const matches = buffer.toString().match(regex)
      if (matches) {
        const value = matches[1].replace(/#.*/g, '').trim()
        if (value !== '') {
          if (attribute === 'albums' || attribute === 'tags') {
            this.info[attribute] = value.split(/\n|,/)
          } else {
            this.info[attribute] = value.trim()
          }
        }
      }
    })

    return this
  }
}

module.exports = InfoFileParser
