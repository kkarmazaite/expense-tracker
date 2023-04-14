import { sendError } from "h3"
import { getAllCategoriesByAccountId } from "~~/server/db/categories"
import { deleteAccountById, getAccountById } from "~~/server/db/accounts"
export default defineEventHandler(async (event) => {
  const accountId = await event.context.params?.id

  if(!accountId){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }

  const accountCategories = await getAllCategoriesByAccountId(accountId)

  if(accountCategories.length>0){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Cannot delete account, because it has categories assigned to it.', 
    }))
  }

  const account = await getAccountById(accountId)

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