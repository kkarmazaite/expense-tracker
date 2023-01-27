
import { ITransaction } from "~~/types/ITransaction"

export default () => {

    const createNewTransaction = async({ date, amount, description, categoryId}:{date:string | undefined, amount: number | undefined, description:string | undefined, categoryId:string | undefined}) => {
        await useFetchApi('/api/transactions', {
            method: 'POST',
            body:{
                date,
                amount, 
                description, 
                categoryId
            }
        })
    }
    const getAccountTransactions = async() => {
        const data:{
            transactions_all:ITransaction[], 
            transactions_income:ITransaction[], 
            transactions_income_total:number,
            transactions_expense:ITransaction[],
            transactions_expense_total:number,
        } = await useFetchApi('/api/transactions' )
        return data
    }
    const deleteTransaction = async(transactionId:string) => {
        await useFetchApi(`/api/transactions/${transactionId}`,{
            method: 'DELETE', })
    }
    return{
        createNewTransaction,
        getAccountTransactions,
        deleteTransaction

    }
}
