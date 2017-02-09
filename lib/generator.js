const fs = require('fs')
const path = require('path')
const InfoFileParser = require('./infoFileParser')

const rawDir = fs.realpathSync(`${__dirname}/../raw`)

fs.readdir(rawDir, (err, files) => {
  files
    .filter(infoFile => path.extname(infoFile) === '.info')
    .forEach(infoFile => {
      const infoFileBaseName = path.basename(infoFile, '.info')
      let imageExists = false
      for (let extension of ['png', 'jpg', 'jpeg']) {
        const upcasedExtension = extension.toUpperCase()
        if (fs.existsSync(path.join(rawDir, `${infoFileBaseName}.${extension}`)) ||
            fs.existsSync(path.join(rawDir, `${infoFileBaseName}.${upcasedExtension}`))) {
          imageExists = true
          break
        }
      }

      if (!imageExists) {
        console.error(`Couldn't found relevant image for '${infoFile}'.`)
        process.exit()
      }

      const infoFilePath = path.join(rawDir, infoFile)
      const infoFileParser = new InfoFileParser(infoFilePath)
      infoFileParser.parse()
    })
});
