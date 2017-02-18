const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const Promise = require('promise')

class ImageOptimizer {
  constructor(originalImagePath) {
    this.originalImagePath = originalImagePath
    let originalExtension = path.extname(originalImagePath)
    this.imageName = path.basename(originalImagePath, originalExtension)
    this.images = {}
  }

  static outputDir() {
    return fs.realpathSync(`${__dirname}/../dist/images`)
  }

  process() {
    const buffer = fs.readFileSync(this.originalImagePath)
    return Promise.all([ Promise.resolve(this._convert(buffer, 1024, 'large')),
                         Promise.resolve(this._convert(buffer, 256, 'small')) ])
  }

  _convert(buffer, width, suffix) {
    const outputImage = `${this.imageName}-${suffix}.jpg`
    const self = this

    return new Promise(function (resolve, reject) {
      sharp(buffer)
        .resize(width)
        .withMetadata()
        .embed()
        .toFile(`${ImageOptimizer.outputDir()}/${outputImage}`, (err, result) => {
          if (err) {
            reject(err)
          }
          else {
            self.images[suffix] = outputImage
            resolve(self)
          }
        })
    })
  }
}

module.exports = ImageOptimizer
