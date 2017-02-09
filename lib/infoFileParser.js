const fs = require('fs')
const path = require('path')

class InfoFileParser {
  constructor(filePath) {
    this.filePath = filePath
    this.defaultInfo = {
      "title": this.getDefaultTitle(),
      "description": null,
      "time taken": null,
      "place": null,
      "albums": ["My Best Clicks"],
      "category": "Uncategorized",
      "tags": [],
    }
    this.info = this.defaultInfo
  }

  getDefaultTitle() {
    return path.basename(this.filePath, path.extname(this.filePath))
               .replace(/-|_/g, ' ')
  }

  parse() {
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
    console.log(this.info)
  }
}

module.exports = InfoFileParser
