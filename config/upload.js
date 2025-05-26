const path=require('path');
const fs=require('fs-extra');
const multer=require('multer');

const uploadDir = path.join(__dirname,'..','uploads');


// Ensure directory exists once when the app starts
fs.ensureDir(uploadDir)
  .then(() => console.log('Upload directory is ready.'))
  .catch(err => console.error('Failed to create upload directory:', err));


  // Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});


// Export multer instance with .array or .single configured if needed
const uploadMultiple = multer({ storage: storage }).array('product_images', 5);
const uploadSingle = multer({ storage: storage }).single('product_image');

module.exports = {
  uploadDir,
  uploadMultiple,
  uploadSingle
};