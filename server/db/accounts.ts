import {prisma} from '.'
import { IAccount } from '~~/types/IAccount'

export const createAccount = async(accountData: IAccount) => {

    return prisma.account.create({
        data: accountData
    })
}
export const getAccountsByNameAndUserId = (name: string, userId:string) => {
    return prisma.account.findMany({
        where: { name, userId }
      })
}
export const getAccountsByUserId = (userId:string) => {
    return prisma.account.findMany({
        where: { userId }
      })
}
export const getAccountById = (accountId:string) => {
    return prisma.account.findUnique({
        where: { id: accountId },
        include: {
            categories: {
                include: {
                    transactions:{
                        include: {
                            category: true
                        }
                    }
                }
            }
        }
      })
}