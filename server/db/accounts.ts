import { prisma } from '.'
import { IAccount } from '~~/types/IAccount'

export const createAccount = async(accountData: IAccount): Promise<IAccount> => {

  return prisma.account.create({
    data: accountData,
  })
}
export const getAccountsByNameAndUserId = (name: string, userId:string): Promise<IAccount[]> => {
  return prisma.account.findMany({
    where: {
      name,
      userId, 
    },
  })
}
export const getAccountsByUserId = (userId:string): Promise<IAccount[]> => {
  return prisma.account.findMany({
    where: { userId },
    include:{
      categories:{
        include:{
          transactions:true,
        },
      },
    },
  })
}
export const getAccountById = (accountId:string): Promise<IAccount | null> => {
  return prisma.account.findUnique({
    where: { id: accountId },
  })
}
export const updateAccount = (accountId:string, newName:string): Promise<IAccount | null> => {
  return prisma.account.update({
    where: { id: accountId },
    data: {
      name: newName,
    },
  })
}
export const deleteAccountById= (accountId:string): Promise<IAccount> => { 
  return prisma.account.delete({
    where: { id: accountId },
  })
}