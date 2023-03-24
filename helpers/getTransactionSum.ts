import { ITransaction } from "~~/types/ITransaction"

export const getTransactionSum = (transactions:ITransaction[]) => {
  return transactions.reduce((sum, transaction:ITransaction) => sum + transaction.amount, 0)
}