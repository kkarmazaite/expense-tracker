import {prisma} from '.'
import { ITransactionCreation } from '~~/types/ITransaction'

export const createTransaction = async(transactionData: ITransactionCreation) => {
    return prisma.transaction.create({
        data: transactionData
    })
}
export const getTransactionsByAccountId = (accountId:string) => {
    return prisma.transaction.findMany({
        where:{
            category: {
                accountId
          }
        },
        include: {
            category: true
        },
        orderBy: {
            date: 'desc',
        }
    })
}
export const getIncomeTransactionsByAccountId = (accountId:string) => {
    return prisma.transaction.findMany({
        where:{
            AND:[
                {
                    category: {
                        accountId
                    }
                },
                {
                    category: {
                        type: {
                            equals: 'income'
                        }
                    }
                },
            ]
        },
        include: {
            category: true
        },
        orderBy: {
            date: 'desc',
        }
    })
}
export const getExpenseTransactionsByAccountId = (accountId:string) => {
    return prisma.transaction.findMany({
        where:{
            AND:[
                {
                    category: {
                        accountId
                    }
                },
                {
                    category: {
                        type: {
                            equals: 'expense'
                        }
                    }
                },
            ]
        },
        include: {
            category: true
        },
        orderBy: {
            date: 'desc',
        }
    })
}