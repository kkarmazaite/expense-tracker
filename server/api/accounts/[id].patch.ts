import { sendError } from "h3"
import { updateAccount, getAccountById } from "~~/server/db/accounts"
export default defineEventHandler(async (event) => {
  const accountId = await event.context.params.id
  const { name }:{name:string} = await readBody(event)

  if(!accountId || !name){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }

  const account = await getAccountById(accountId)

  if(!account){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Account not found', 
    }))
  }

  await updateAccount(accountId, name)

  return {
    message: 'Account updated',
  }
})