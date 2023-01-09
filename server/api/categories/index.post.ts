import { sendError } from "h3"
import { H3Event } from "h3"
import { ICategory } from "~~/types/ICategory"
import { createCategory, getCategoriesByNameTypeAndAccountId } from "~~/server/db/categories"

export default defineEventHandler(async (event: H3Event) => {

const body = await readBody(event)

const {name, type, accountId}:ICategory = body

if(!name || !type || !accountId){
    return sendError(event, createError({statusCode: 400, statusMessage: 'Invalid parameters'}))
}

const sameNameAndTypeCategories = await getCategoriesByNameTypeAndAccountId(name, type, accountId)
if(sameNameAndTypeCategories.length>0){
    return sendError(event, createError({statusCode: 400, statusMessage: 'Category with this name and type already exists'}))
}

const categoryData = { name, type, accountId}

const category = await createCategory(categoryData)

return {
    body: category
}
})