import {prisma} from '.'
import { IAccount } from '~~/types/IAccount'

export const createAccount = async(accountData: IAccount) => {

    return prisma.account.create({
        data: accountData
    })
}
export const geAccountByNameAndUserId = (name: string, userId:string) => {
    return prisma.account.findMany({
        where: { name, userId }
      })
}
export const geAccountByUserId = (userId:string) => {
    return prisma.account.findMany({
        where: { userId }
      })
}
export const getAccountById = (accountId:string) => {
    return prisma.account.findUnique({
        where: { id: accountId }
      })
}