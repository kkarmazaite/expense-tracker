import { sendError } from "h3"
import { getTransactionsByAccountId,  getIncomeTransactionsByAccountId, getExpenseTransactionsByAccountId } from "~~/server/db/transactions"

export default defineEventHandler(async (event) => {
  const selectedAccountId = getCookie(event, 'selected_account')
  if(!selectedAccountId){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }
  const accountTransactions = await getTransactionsByAccountId(selectedAccountId) 

  const accountIncomeTransactions = await  getIncomeTransactionsByAccountId(selectedAccountId)
  const accountIncomeTransactionsTotal = accountIncomeTransactions.reduce((partialSum, transaction) => partialSum + transaction.amount, 0)

  const accountExpenseTransactions = await  getExpenseTransactionsByAccountId(selectedAccountId)
  const accountExpenseTransactionsTotal = accountExpenseTransactions.reduce((partialSum, transaction) => partialSum + transaction.amount, 0)
    
  return{
    "transactions_all": accountTransactions,
    'transactions_income': accountIncomeTransactions,
    'transactions_income_total': accountIncomeTransactionsTotal,
    'transactions_expense': accountExpenseTransactions,
    'transactions_expense_total': accountExpenseTransactionsTotal,
  }
})