import { sendError } from "h3"
import { getTransactionsByCategoryId } from "~~/server/db/transactions"
import { deleteCategoryById, getCategoryById } from "~~/server/db/categories"
export default defineEventHandler(async (event) => {

  const categoryId = event.context.params.id as string | undefined

  if(!categoryId){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }

  const categoryTransactions = await getTransactionsByCategoryId(categoryId)

  if(categoryTransactions.length>0){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Cannot delete category, because it has transactions assigned to it.', 
    }))
  }

  const category = await getCategoryById(categoryId)

  if(!category){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Category not found', 
    }))
  }

  await deleteCategoryById(categoryId)

  return {
    message: 'Category deleted',
  }
})