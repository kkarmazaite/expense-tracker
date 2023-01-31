import { prisma } from '.'
import { ITransaction, ITransactionCreation } from '~~/types/ITransaction'

export const createTransaction = async(transactionData: ITransactionCreation): Promise<ITransactionCreation | null> => {
  return prisma.transaction.create({
    data: transactionData,
  })
}
export const getTransactionsByAccountId = (accountId:string): Promise<ITransaction[]> => {
  return prisma.transaction.findMany({
    where:{
      category: {
        accountId,
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
export const getIncomeTransactionsByAccountId = (accountId:string): Promise<ITransaction[]> => {
  return prisma.transaction.findMany({
    where:{
      AND:[
        {
          category: {
            accountId,
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
export const getExpenseTransactionsByAccountId = (accountId:string): Promise<ITransaction[]> => {
  return prisma.transaction.findMany({
    where:{
      AND:[
        {
          category: {
            accountId,
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
export const deleteTransactionById = (transactionId:string):Promise<ITransactionCreation | null> => { 
  return prisma.transaction.delete({
    where: {
      id: transactionId,
    },
  })
}