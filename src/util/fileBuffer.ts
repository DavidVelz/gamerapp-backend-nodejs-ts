import multer from 'multer'
import { inputGame } from '../util/utilities';

export default multer({       
  storage: multer.memoryStorage()    
}).single(inputGame.image);

