import { sendError } from "h3"
import { getTransactionsByAccountId,  getIncomeTransactionsByAccountId, getExpenseTransactionsByAccountId } from "~~/server/db/transactions"

export default defineEventHandler(async (event) => {
  const selectedAccountId = getCookie(event, 'selected_account')
  const dateFrom = getCookie(event, 'date_from')
  const dateTo = getCookie(event, 'date_to')

  const { start, count } = getQuery(event)

  const recordStart = parseInt(start as string, 10)
  const recordCount = parseInt(count as string, 10)

  const startDate = new Date(dateFrom as string);
  const endDate = new Date(dateTo as string);


  if(!selectedAccountId){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }
  const accountTransactions = await getTransactionsByAccountId(selectedAccountId, startDate, endDate, recordStart, recordCount) 

  const accountIncomeTransactions = await  getIncomeTransactionsByAccountId(selectedAccountId, startDate, endDate)
  const accountIncomeTransactionsTotal = accountIncomeTransactions.reduce((partialSum, transaction) => partialSum + transaction.amount, 0)

  const accountExpenseTransactions = await  getExpenseTransactionsByAccountId(selectedAccountId, startDate, endDate)
  const accountExpenseTransactionsTotal = accountExpenseTransactions.reduce((partialSum, transaction) => partialSum + transaction.amount, 0)
    
  return{
    "transactions_all": accountTransactions,
    'transactions_income': accountIncomeTransactions,
    'transactions_income_total': accountIncomeTransactionsTotal,
    'transactions_expense': accountExpenseTransactions,
    'transactions_expense_total': accountExpenseTransactionsTotal,
  }
})