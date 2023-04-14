import { sendError } from "h3"
import { getAccountById } from "~~/server/db/accounts"

export default defineEventHandler(async (event) => {
  const accountId = await event.context.params?.id

  if(!accountId){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }

  const account = await getAccountById(accountId)

  setCookie(event, "selected_account", accountId, {
    httpOnly: true,
    sameSite: true,
  })

  return {
    account: account,
  }
})