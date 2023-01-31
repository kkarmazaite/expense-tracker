import { prisma } from '.'
import { ICategory, ICategoryAccountTypes } from '~~/types/ICategory'

export const createCategory = async(categoryData: ICategory): Promise<ICategory | null> => {

  return prisma.category.create({
    data: categoryData,
  })
}
export const getCategoriesByNameTypeAndAccountId = (name: string, type: ICategoryAccountTypes, accountId:string): Promise<ICategory[]> => {
  return prisma.category.findMany({
    where: {
      name,
      type,
      accountId, 
    },
  })
}
export const getCategoriesByAccountId = (accountId:string): Promise<ICategory[]> => {
  return prisma.category.findMany({
    where: { accountId },
  })
}
export const getCategoryById = (categoryId:string): Promise<ICategory | null> => {
  return prisma.category.findUnique({
    where: { id: categoryId },
  })
}
export const deleteCategoryById = (categoryId:string): Promise<ICategory | null> => { 
  return prisma.category.delete({
    where: { id: categoryId },
  })
}