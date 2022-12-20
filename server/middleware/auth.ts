import UrlPattern from "url-pattern"
import { decodeAccessToken } from "../utils/jwt"
import { sendError } from "h3"
import { getUserById } from "../db/users"
import { H3Event } from "h3"
import { IToken } from "~~/types/IToken"

export default defineEventHandler( async (event: H3Event) => {
    const endpoints : string[] = ['/api/auth/user']

    const isHandledByThisMiddleware : boolean = endpoints.some(endpoint => {

        const pattern = new UrlPattern(endpoint)

        return pattern.match(event.node.req.url || '')

    })

    if(!isHandledByThisMiddleware){
        return
    }

    const token : string | undefined = event.node.req.headers['authorization']?.split(' ')[1]

    if(!token){
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unautorized'
        }))
    }

    const decoded: IToken | null = decodeAccessToken(token)

    if(!decoded){
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unautorized'
        }))
    }


    try{
        const userId : string = decoded.userId
        const user = await getUserById(userId)

        event.context.auth = { user }
    } catch(error){
        return
    }
})