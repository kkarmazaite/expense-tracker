import { sendError } from "h3"
import { createAccount, getAccountsByNameAndUserId } from "~~/server/db/accounts"
import { IAccount } from "~~/types/IAccount"

export default defineEventHandler(async (event) => {

  const { name, userId }:IAccount = await readBody(event)

  if(!name || !userId){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }

  const sameNameAccounts = await getAccountsByNameAndUserId(name, userId)
  if(sameNameAccounts.length>0){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Account with this name already exists', 
    }))
  }

  const accountData = {
    name,
    userId, 
  }

  const account = await createAccount(accountData)

  return {
    account,
  }
})