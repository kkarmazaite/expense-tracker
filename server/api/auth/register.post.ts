import { sendError } from "h3"
import { createUser, getUserByEmail } from "~~/server/db/users"
import { userTransformer } from "~~/server/transformers/user"
import { IUser } from "~~/types/IUser"

export default defineEventHandler(async (event) => {

  const {
    email, password, repeatPassword, name, 
  }:IUser = await readBody(event)

  if(!email || !password || !repeatPassword || !name){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }

  if(password.length < 6 || password === password.toLowerCase() || !/\d/.test(password)){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'The password should be at least 6 characters long, contain at least one number and a uppercase letter.', 
    }))
  }

  if(password !== repeatPassword){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Passwords do not match', 
    }))
  }

  const userExists = await getUserByEmail(email)
  if(userExists){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'User with this email already exists', 
    }))
  }

  const userData = {
    email,
    password,
    name,
    profileImage: 'https://picsum.photos/200/200', 
  }

  const user = await createUser(userData)

  return {
    user: userTransformer(user),
  }
})