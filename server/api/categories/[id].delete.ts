import { sendError } from "h3"
import { H3Event } from "h3"
import { ITransaction } from "~~/types/ITransaction"
import { getTransactionsByCategoryId } from "~~/server/db/transactions"
import { ICategory } from "~~/types/ICategory"
import { deleteCategoryById, getCategoryById } from "~~/server/db/categories"
export default defineEventHandler( async (event: H3Event) => {
    const categoryId = await event.context.params.id

    if(!categoryId){
        return sendError(event, createError({statusCode: 400, statusMessage: 'Invalid parameters'}))
    }

    const categoryTransactions:ITransaction[] | null = await getTransactionsByCategoryId(categoryId)

    if(categoryTransactions.length>0){
        return sendError(event, createError({statusCode: 400, statusMessage: 'Cannot delete category, because it has transactions assigned to it.'}))
    }

    const category:ICategory | null = await getCategoryById(categoryId)

    if(!category){
        return sendError(event, createError({statusCode: 400, statusMessage: 'Category not found'}))
    }

    await deleteCategoryById(categoryId)

    return {
       message: 'Category deleted'
    }
})