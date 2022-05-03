const multer = require('multer');
const path = require('path');

module.exports = {
  upload: multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, path.join(__dirname, '../..' ,'static', 'fotos'))
      },
      filename: (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname))
      }
    }),
    limits: { fileSize: '3024 * 1024' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))
  
        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Formato de imagem incorreto.')
    }
  }).single('imagem'),
};


