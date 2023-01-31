import { sendError } from "h3"
import { ITransaction } from "~~/types/ITransaction"
import { createTransaction } from "~~/server/db/transactions"

export default defineEventHandler(async (event) => {

  const {
    date, amount, description, categoryId, 
  }:ITransaction = await readBody(event)


  if(!date || !amount|| !categoryId){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }

  const transactionData = {
    date,
    amount,
    description,
    categoryId, 
  }

  const transaction = await createTransaction(transactionData)

  return {
    body: transaction,
  }
})