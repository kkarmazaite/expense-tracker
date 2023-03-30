import { prisma } from '.'
import { ITransaction, ITransactionCreation } from '~~/types/ITransaction'


export const createTransaction = async(transactionData: ITransactionCreation): Promise<ITransactionCreation | null> => {
  return prisma.transaction.create({
    data: transactionData,
  })
}
export const getTransactionsByAccountId = (accountId:string, dateFrom: Date, dateTo: Date): Promise<ITransaction[]> => {
  return prisma.transaction.findMany({
    where:{
      category: {
        accountId,
      },
      date: {
        gte: dateFrom,
        lte: dateTo,
      },

    },
    include: {
      category: true,
    },
    orderBy: {
      date: 'desc',
    },
  })
}
export const getIncomeTransactionsByAccountId = (accountId:string, dateFrom: Date, dateTo: Date): Promise<ITransaction[]> => {
  return prisma.transaction.findMany({
    where:{
      AND:[
        {
          category: {
            accountId,
          },
          date: {
            gte: dateFrom,
            lte: dateTo,
          },
        },
        {
          category: {
            type: {
              equals: 'income',
            },
          },
        },
      ],
    },
    include: {
      category: true,
    },
    orderBy: {
      date: 'desc',
    },
  })
}
export const getExpenseTransactionsByAccountId = (accountId:string, dateFrom: Date, dateTo: Date): Promise<ITransaction[]> => {
  return prisma.transaction.findMany({
    where:{
      AND:[
        {
          category: {
            accountId,
          },
          date: {
            gte: dateFrom,
            lte: dateTo,
          },
        },
        {
          category: {
            type: {
              equals: 'expense',
            },
          },
        },
      ],
    },
    include: {
      category: true,
    },
    orderBy: {
      date: 'desc',
    },
  })
    
}
export const getTransactionById = (transactionId:string):Promise<ITransaction | null> => {
  return prisma.transaction.findUnique({
    where: {
      id: transactionId,
    },
    include: {
      category: true,
    },
  })
}
export const getTransactionsByCategoryId = (categoryId:string): Promise<ITransaction[]> => {
  return prisma.transaction.findMany({
    where:{
      categoryId,
    },
    include: {
      category: true,
    },
    orderBy: {
      date: 'desc',
    },
  })
}
export const updateTransaction = (transactionId: string, newTransactionData: ITransactionCreation): Promise<ITransactionCreation | null> => {
  return prisma.transaction.update({
    where: { id: transactionId },
    data: newTransactionData,
  })
}
export const deleteTransactionById = (transactionId:string):Promise<ITransactionCreation | null> => { 
  return prisma.transaction.delete({
    where: {
      id: transactionId,
    },
  })
}