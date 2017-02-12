const fs = require('fs')
const path = require('path')
const {ExifImage} = require('exif')
const {Fraction} = require('fractional')

class ExifExtractor {
  constructor(imagePath) {
    this.imagePath = imagePath
    this.exif = {}
  }

  process() {
    const buffer = fs.readFileSync(this.imagePath)
    const parsedInfo = {}
    const self = this

    return new Promise(function (resolve, reject) {
      new ExifImage({image: self.imagePath}, (err, exifData) => {
        if (err) {
          console.error(`Error while extracting EXIF information from ${self.imagePath}: ${err.message}`)
          reject(err)
        } else {
          self.exif = {
            deviceMake: exifData.image.Make,
            deviceModel: exifData.image.Model,
            exposureTime: new Fraction(exifData.exif.ExposureTime).toString(),
            fNumber: exifData.exif.FNumber,
            exposureProgram: exifData.exif.ExposureProgram,
            iso: exifData.exif.ISO,
            sensitivityType: exifData.exif.SensitivityType,
            createDate: exifData.exif.CreateDate,
            shutterSpeedValue: exifData.exif.ShutterSpeedValue,
            apertureValue: exifData.exif.ApertureValue,
            meteringMode: exifData.exif.MeteringMode,
            flash: exifData.exif.Flash,
            focalLength: exifData.exif.FocalLength,
            colorSpace: exifData.exif.ColorSpace,
            lensModel: exifData.exif.LensModel,
            lensSerialNumber: exifData.exif.LensSerialNumber,
          }
          resolve(self)
        }
      })
    })
  }
}

module.exports = ExifExtractor
