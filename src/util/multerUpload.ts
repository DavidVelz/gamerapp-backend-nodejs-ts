import multer from 'multer'
import path from 'path';
import fs from 'fs-extra'
import { extImage } from './utilities'
import { env } from '../config/config';


const storage = multer.diskStorage({
  destination: env.desUpload,
  filename: async (req, file, cb) => {    
    cb(null, file.originalname);
  }
});
 
export default multer({
    storage: storage  
  }).single("gimage");
