import { sendError } from "h3"
import { deleteTransactionById, getTransactionById } from "~~/server/db/transactions"
export default defineEventHandler(async (event) => {
  const transactionId = await event.context.params.id

  if(!transactionId){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }

  const transaction = await getTransactionById(transactionId)

  if(!transaction){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Transaction not found', 
    }))
  }

  await deleteTransactionById(transactionId)

  return {
    message: 'Transaction deleted',
  }
})