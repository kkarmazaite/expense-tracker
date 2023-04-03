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
export const getAllCategoriesByAccountId = (accountId:string): Promise<ICategory[]> => {
  return prisma.category.findMany({
    where: { 
      accountId,
    },
  })
}
export const getCategoriesByAccountId = (accountId:string, dateFrom: Date, dateTo: Date): Promise<ICategory[]> => {
  return prisma.category.findMany({
    where: { 
      accountId,
    },
    include: {
      transactions: {
        where:{
          date: {
            gte: dateFrom,
            lte: dateTo,
          },
        },
      },
      icon:true,
    },
    
  })
}
export const getCategoryById = (categoryId:string): Promise<ICategory | null> => {
  return prisma.category.findUnique({
    where: { id: categoryId },
  })
}
export const updateCategory = (categoryId:string, newName:string, newIconId: string | undefined): Promise<ICategory | null> => {
  return prisma.category.update({
    where: { id: categoryId },
    data: {
      name: newName,
      iconId: newIconId,
    },
  })
}
export const deleteCategoryById = (categoryId:string): Promise<ICategory | null> => { 
  return prisma.category.delete({
    where: { id: categoryId },
  })
}