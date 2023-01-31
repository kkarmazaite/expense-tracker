import { sendError } from "h3"
import { getRefreshTokenByToken } from "~~/server/db/refreshTokens"
import { getUserById } from "~~/server/db/users"
import { decodeRefreshToken, generateTokens } from "~~/server/utils/jwt"
import { H3Event } from "h3"
import { IUser } from "~~/types/IUser"

export default defineEventHandler(async (event: H3Event) => {
  const refreshToken = getCookie(event, 'refresh_token')

  if(!refreshToken){
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: `Refresh token is invalid`,
    }))
  }

  const rToken = await getRefreshTokenByToken(refreshToken)

  if(!rToken){
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh token is invalid',
    }))
  }

  const token = decodeRefreshToken(refreshToken)

  if(!token){
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh token is invalid',
    }))
  }

  try{
    const user :IUser | null = await getUserById(token.userId)

    if(!user){
      return sendError(event, createError({
        statusCode: 500,
        statusMessage: 'Something went wrong',
      }))
    }

    const { accessToken } = generateTokens(user)

    return {
      access_token: accessToken,
    }
  } catch (error){
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Something went wrong',
    }))
  }
})