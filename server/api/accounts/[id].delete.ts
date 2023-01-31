import { sendError } from "h3"
import { H3Event } from "h3"
import { ICategory } from "~~/types/ICategory"
import { getCategoriesByAccountId } from "~~/server/db/categories"
import { IAccount } from "~~/types/IAccount"
import { deleteAccountById, getAccountById } from "~~/server/db/accounts"
export default defineEventHandler(async (event: H3Event) => {
  const accountId = await event.context.params.id

  if(!accountId){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }

  const accountCategories:ICategory[] | null = await getCategoriesByAccountId(accountId)

  if(accountCategories.length>0){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Cannot delete account, because it has categories assigned to it.', 
    }))
  }

  const account:IAccount | null = await getAccountById(accountId)

  if(!account){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Account not found', 
    }))
  }

  await deleteAccountById(accountId)

  return {
    message: 'Account deleted',
  }
})