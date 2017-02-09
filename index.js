const { ExifImage } = require('exif')
const fs = require('fs')
const path = require('path')

const imageDir = './images/'
fs.readdir(imageDir, (err, files) => {
  console.log(path.extname(files[0]));
  files.filter(image => path.extname(image) === '.jpg')
       .forEach(image => {
          new ExifImage({image: imageDir + image}, (error, exifData) => {
            if (error)
              console.log('Error: '+error.message);
            else
              console.log(exifData);
          })
        })
});
