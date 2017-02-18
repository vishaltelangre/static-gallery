const fs = require('fs')
const path = require('path')
const ExifExtractor = require('./exifExtractor')
const ImageOptimizer = require('./imageOptimizer')
const InfoFileParser = require('./infoFileParser')
const mkdirp = require('mkdirp')

const rawDir = fs.realpathSync(`${__dirname}/../raw`)
const distDir = fs.realpathSync(`${__dirname}/../dist`)

mkdirp(`${distDir}/images`, (err) => {})

let finalData = {
  items: [],
  filters: { Album: [], Category: [], Tag: [] }
}

function parseFilters() {
  finalData.items.forEach(image => {
    if (image.albums.length > 0) {
      finalData.filters.Album = finalData.filters.Album.concat(image.albums)
    }
    if (image.category) {
      finalData.filters.Category.push(image.category)
    }
    if (image.tags.length > 0) {
      finalData.filters.Tag = finalData.filters.Tag.concat(image.tags)
    }
  })

  finalData.filters.Album = [...new Set(finalData.filters.Album)].sort()
  finalData.filters.Category = [...new Set(finalData.filters.Category)].sort()
  finalData.filters.Tag = [...new Set(finalData.filters.Tag)].sort()
}

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
              finalData.items.push(infoFileParser.info)
              parseFilters()
              fs.writeFileSync(`${distDir}/data.json`, JSON.stringify(finalData))
            })
        })
    })
})
