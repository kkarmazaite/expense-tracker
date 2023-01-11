import {prisma} from '.'
import { ICategory, ICategoryAccountTypes } from '~~/types/ICategory'
import { ITransaction } from '~~/types/ITransaction'

export const createTransaction = async(transactionData: ITransaction) => {
    return prisma.transaction.create({
        data: transactionData
    })
}
// export const getCategoriesByAccountId = (accountId:string) => {
//     return prisma.category.findMany({
//         where: { accountId }
//       })
// }
// export const getCategoryById = (categoryId:string) => {
//     return prisma.category.findUnique({
//         where: { id: categoryId }
//       })
// }