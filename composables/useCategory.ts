import { ICategory, ICategoryAccountTypes } from "~~/types/ICategory"
import { ICategoryExtented } from "~~/types/ICategoryExtended"

export default () => {

  const createNewCategory = async({
    name, type, accountId, iconId, 
  }:{name:string | undefined, type: ICategoryAccountTypes | undefined, accountId:string | undefined, iconId:string | undefined}) => {
    await useFetchApi('/api/categories', {
      method: 'POST',
      body:{
        name,
        type,
        accountId,
        iconId,
      },
    })
  }
  const getAccountCategories = async() => {
    const data:{categories:ICategoryExtented[]} = await useFetchApi('/api/categories')
    return data
  }

  const getCategoryById = async(categoryId:string) => {
    const data:{category:ICategory} = await useFetchApi(`/api/categories/${categoryId}`)
    return data
  }
  const deleteCategory = async(categoryId:string) => {
    await useFetchApi(`/api/categories/${categoryId}`, { method: 'DELETE' })
  }
  const updateCategory = async({ categoryId, name, iconId }:{categoryId:string, name:string, iconId:string | undefined}) => {
    await useFetchApi(`/api/categories/${categoryId}`, { 
      method: 'PATCH',
      body:{
        name,
        iconId,
      },
    })
  }
  return{
    createNewCategory,
    getAccountCategories,
    getCategoryById,
    deleteCategory,
    updateCategory,
  }
}
