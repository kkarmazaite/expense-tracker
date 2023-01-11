import { ICategory, ICategoryAccountTypes } from "~~/types/ICategory"

export default () => {

    const createNewTransaction = async({ date, amount, description, categoryId}:{date:string | undefined, amount: number | undefined, description:string | undefined, categoryId:string | undefined}) => {
        await useFetchApi('/api/transactions', {
            method: 'POST',
            body:{
                date,
                amount, 
                description, 
                categoryId
            }
        })
    }
    // const getAccountCategories = async() => {
    //     const data:{accounts:ICategory[]} = await useFetchApi('/api/category' )
    //     return data
    // }

    // const getCategoryById = async(categoryId:string) => {
    //     const data:{category:ICategory} = await useFetchApi(`/api/categories/${categoryId}` )
    //     return data
    // }
    return{
        createNewTransaction,

    }
}
