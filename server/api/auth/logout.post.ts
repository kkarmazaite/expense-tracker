import { removeRefreshToken } from "~~/server/db/refreshTokens"

export default defineEventHandler(async (event) => {
  try{
    const refreshToken = getCookie(event, 'refresh_token')
    await removeRefreshToken(refreshToken)
  }catch(error){

  }
  deleteCookie(event, 'refresh_token')
    
  return { message: 'User successfully logged out' }
})