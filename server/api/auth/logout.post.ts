import { H3Event } from "h3"
import { removeRefreshToken } from "~~/server/db/refreshTokens"

export default defineEventHandler( async (event: H3Event) => {
    try{
        const refreshToken = getCookie(event, 'refresh_token')
        await removeRefreshToken(refreshToken)
    }catch(error){

    }
    deleteCookie(event, 'refresh_token')
    
    return { message: 'User successfully logout' }
})