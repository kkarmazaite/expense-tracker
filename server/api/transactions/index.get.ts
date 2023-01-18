import { sendError } from "h3"
import { H3Event } from "h3"
import { ITransaction } from "~~/types/ITransaction"
import { getTransactionsByAccountId,  getIncomeTransactionsByAccountId, getExpenseTransactionsByAccountId } from "~~/server/db/transactions"

export default defineEventHandler( async (event: H3Event) => {
    const selectedAccountId = getCookie(event, 'selected_account')
    if(!selectedAccountId){
        return sendError(event, createError({statusCode: 400, statusMessage: 'Invalid parameters'}))
    }
    const accountTransactions:ITransaction[] = await getTransactionsByAccountId(selectedAccountId) 

    const accountIncomeTransactions:ITransaction[] = await  getIncomeTransactionsByAccountId(selectedAccountId)
    const accountIncomeTransactionsTotal:number = accountIncomeTransactions.reduce((partialSum, transaction) => partialSum + transaction.amount, 0)

    const accountExpenseTransactions:ITransaction[] = await  getExpenseTransactionsByAccountId(selectedAccountId)
    const accountExpenseTransactionsTotal:number = accountExpenseTransactions.reduce((partialSum, transaction) => partialSum + transaction.amount, 0)
    
    return{
        "transactions_all": accountTransactions,
        'transactions_income': accountIncomeTransactions,
        'transactions_income_total': accountIncomeTransactionsTotal,
        'transactions_expense': accountExpenseTransactions,
        'transactions_expense_total': accountExpenseTransactionsTotal
    }
})