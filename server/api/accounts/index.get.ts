import { sendError } from "h3"
import { getAccountsByUserId } from "~~/server/db/accounts"

export default defineEventHandler(async (event) => {

  const userId = await event.context.auth.user.id

  if(!userId){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }

  const userAccounts = await getAccountsByUserId(userId) 

  return {
    accounts: userAccounts,
  }
})