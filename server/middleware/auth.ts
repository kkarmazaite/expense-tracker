import UrlPattern from "url-pattern"
import { decodeAccessToken } from "../utils/jwt"
import { sendError } from "h3"
import { getUserById } from "../db/users"

export default defineEventHandler(async (event) => {
  const endpoints : string[] = [
    '/api/auth/user',
    '/api/accounts',
    '/api/accounts/:id',
    '/api/categories',
    '/api/transactions',
  ]

  const isHandledByThisMiddleware = endpoints.some(endpoint => {

    const pattern = new UrlPattern(endpoint)

    return pattern.match(event.node.req.url || '')

  })

  if(!isHandledByThisMiddleware){
    return
  }

  const token  = event.node.req.headers['authorization']?.split(' ')[1]

  if(!token){
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unautorized',
    }))
  }

  const decoded = decodeAccessToken(token)

  if(!decoded){
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unautorized',
    }))
  }


  try{
    const userId  = decoded.userId
    const user = await getUserById(userId)

    event.context.auth = { user }
  } catch(error){
    return
  }
})