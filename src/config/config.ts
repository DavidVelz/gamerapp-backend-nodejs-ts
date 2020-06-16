import dotenv from 'dotenv'; 
dotenv.config (); 

export const env = {
  uridb:process.env.URI,
  port:   process.env.PORT,
  mysecret: 'usersecret',
  expiresIn: process.env.EXPIRE_TOKEN,
  desUpload: process.env.DESTINATION_UPLOAD
}






