import { ICategory, ICategoryAccountTypes } from "~~/types/ICategory"

export default () => {

    const createNewCategory = async({ name, type, accountId}:{name:string | undefined, type: ICategoryAccountTypes | undefined, accountId:string | undefined}) => {
        await useFetchApi('/api/categories', {
            method: 'POST',
            body:{
                name,
                type,
                accountId
            }
        })
    }
    const getAccountCategories = async() => {
        const data:{accounts:ICategory[]} = await useFetchApi('/api/category' )
        return data
    }

    const getCategoryById = async(categoryId:string) => {
        const data:{category:ICategory} = await useFetchApi(`/api/categories/${categoryId}` )
        return data
    }
    return{
        createNewCategory,
        getAccountCategories,
        getCategoryById
    }
}
