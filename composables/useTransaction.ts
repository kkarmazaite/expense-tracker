
import { ITransaction } from "~~/types/ITransaction"

export default () => {

  const createNewTransaction = async({
    date, amount, description, categoryId, 
  }:{date:string | undefined, amount: number | undefined, description:string | undefined, categoryId:string | undefined}) => {
    await useFetchApi('/api/transactions', {
      method: 'POST',
      body:{
        date,
        amount, 
        description, 
        categoryId,
      },
    })
  }
  const getAccountTransactions = async({ start, count }: {start:number, count:number}) => {
    const data:{
            transactions_all:ITransaction[], 
            transactions_income:ITransaction[], 
            transactions_income_total:number,
            transactions_expense:ITransaction[],
            transactions_expense_total:number,
        } = await useFetchApi('/api/transactions', {
          method: 'GET',
          query: { 
            start,
            count,
          },
        })
    return data
  }

  const deleteTransaction = async(transactionId:string) => {
    await useFetchApi(`/api/transactions/${transactionId}`, { method: 'DELETE' })
  }

  const updateTransaction = async(
    {
      transactionId, date, amount, description, categoryId, 
    } 
    :{
      transactionId:string, date:string | undefined, amount: number | undefined, description:string | undefined, categoryId:string | undefined
    },
  ) => {
    await useFetchApi(`/api/transactions/${transactionId}`, { 
      method: 'PATCH',
      body:{
        date,
        amount,
        description,
        categoryId,
      },
    })
  }
  return{
    createNewTransaction,
    getAccountTransactions,
    deleteTransaction,
    updateTransaction,

  }
}
