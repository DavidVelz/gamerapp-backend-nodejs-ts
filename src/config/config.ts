import dotenv from 'dotenv'; 
dotenv.config (); 

export const env = {
  uridb:process.env.URI,
  port:   process.env.PORT,
  mysecret: 'usersecret',
  expiresIn: process.env.EXPIRE_TOKEN
}

export const regexFields = {
  email: "^[_a-z0-9-]+(.[_a-z0-9-]+)@[a-z0-9-]+(.[a-z0-9-]+)(.[a-z]{2,4})$",
  password: "[A-Z]+.{6,15}",
  age:"^[0-9]{2}"
}




