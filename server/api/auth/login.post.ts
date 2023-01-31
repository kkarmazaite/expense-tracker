import { sendError } from "h3"
import { getUserByEmail } from "~/server/db/users"
import bcrypt from 'bcrypt'
import { generateTokens, sendRefreshToken } from "~~/server/utils/jwt"
import { userTransformer } from "~~/server/transformers/user"
import { createRefreshToken } from "~~/server/db/refreshTokens"
import { ILogin } from "~~/types/ILogin"

export default defineEventHandler(async (event) => {
  const { email, password }:ILogin = await readBody(event)

  if(!email || !password){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }
  const user = await getUserByEmail(email)

  if(!user || !user.password || !user.id){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Email or password is invalid', 
    }))
  }

  const doesThePasswordsMatch  = await bcrypt.compare(password, user.password)

  if(!doesThePasswordsMatch){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Email or password is invalid', 
    }))
  }
    
  const { accessToken, refreshToken } = generateTokens(user)

  //Save token in db
  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  })

  //Add http only cookie
  sendRefreshToken(event, refreshToken)

  return{
    user: userTransformer(user),
    access_token: accessToken,
  }
})