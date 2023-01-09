import {prisma} from '.'
import { ICategory, ICategoryAccountTypes } from '~~/types/ICategory'

export const createCategory = async(categoryData: ICategory) => {

    return prisma.category.create({
        data: categoryData
    })
}
export const getCategoriesByNameTypeAndAccountId = (name: string, type: ICategoryAccountTypes, accountId:string) => {
    return prisma.category.findMany({
        where: { name, type, accountId }
      })
}
export const getCategoriesByAccountId = (accountId:string) => {
    return prisma.category.findMany({
        where: { accountId }
      })
}
export const getCategoryById = (categoryId:string) => {
    return prisma.category.findUnique({
        where: { id: categoryId }
      })
}