import { sendError } from "h3"
import { getTransactionById, updateTransaction } from "~~/server/db/transactions"
import { ITransaction } from "~~/types/ITransaction"
export default defineEventHandler(async (event) => {

  const transactionId = await event.context.params.id
  const {
    date, amount, description, categoryId, 
  }:ITransaction = await readBody(event)

  if(!transactionId || !date || !amount|| !categoryId){
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

  const transactionData = {
    date,
    amount,
    description,
    categoryId, 
  }

  await updateTransaction(transactionId, transactionData)

  return {
    message: 'Transaction updated',
  }

})