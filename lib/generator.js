const fs = require('fs')
const path = require('path')
const ExifExtractor = require('./exifExtractor')
const ImageOptimizer = require('./imageOptimizer')
const InfoFileParser = require('./infoFileParser')
const mkdirp = require('mkdirp')

const rawDir = fs.realpathSync(`${__dirname}/../raw`)
const distDir = fs.realpathSync(`${__dirname}/../dist`)

mkdirp(`${distDir}/images`, (err) => {})

let finalData = []

fs.readdir(rawDir, (err, files) => {
  files
    .filter(infoFile => path.extname(infoFile) === '.info')
    .forEach(infoFile => {
      const infoFileBaseName = path.basename(infoFile, '.info')
      let foundImage
      for (let extension of ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']) {
        if (fs.existsSync(path.join(rawDir, `${infoFileBaseName}.${extension}`))) {
          foundImage = `${infoFileBaseName}.${extension}`
          break
        }
      }

      if (!foundImage) {
        console.error(`Couldn't found relevant image for '${infoFile}'.`)
        process.exit()
      }

      const infoFilePath = path.join(rawDir, infoFile)
      const foundImagePath = path.join(rawDir, foundImage)
      new ExifExtractor(foundImagePath)
        .process()
        .then((exifExtractor) => {
          new ImageOptimizer(foundImagePath)
            .process()
            .then((imageOptimizer) => {
              const opts = { images: imageOptimizer[0].images,
                             exif: exifExtractor.exif }
              const infoFileParser = new InfoFileParser(infoFilePath, opts).process()
              finalData.push(infoFileParser.info)
              fs.writeFileSync(`${distDir}/data.json`, JSON.stringify(finalData))
            })
        })
    })
})
