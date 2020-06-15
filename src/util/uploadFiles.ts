import multer from 'multer'
import path from 'path';
import fs from 'fs-extra'

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

export default multer({
    storage: storage,
    fileFilter: (req, file, cb) => {      
        if (file.mimetype === "image/png" 
        || file.mimetype === "image/jpg" 
        || file.mimetype === "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);        
          cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }      
    }
  }).single("gimage");
