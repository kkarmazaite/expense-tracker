import { sendError } from "h3"
import { updateAccount, getAccountById, getAccountsByNameAndUserId } from "~~/server/db/accounts"
export default defineEventHandler(async (event) => {
  const accountId = await event.context.params?.id
  const { name }:{ name:string} = await readBody(event)

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

  const sameNameAccounts = await getAccountsByNameAndUserId(name, account.userId)
  if(sameNameAccounts.length>0){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Account with this name already exists', 
    }))
  }

  await updateAccount(accountId, name)

  return {
    message: 'Account updated',
  }
})