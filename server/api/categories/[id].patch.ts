import { sendError } from "h3"
import { updateCategory, getCategoriesByNameTypeAndAccountId, getCategoryById } from "~~/server/db/categories"
export default defineEventHandler(async (event) => {

  const categoryId = event.context.params.id as string | undefined
  const { name, iconId }:{ name:string, iconId: string | undefined} = await readBody(event)

  if(!categoryId || !name){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }

  const category = await getCategoryById(categoryId)

  if(!category){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Category not found', 
    }))
  }

  if(category.name !== name){
    const sameNameAndTypeCategories = await getCategoriesByNameTypeAndAccountId(name, category.type, category.accountId)
    if(sameNameAndTypeCategories.length>0){
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: 'Category with this name and type already exists', 
      }))
    }
  }


  await updateCategory(categoryId, name, iconId)

  return {
    message: 'Category updated',
  }

})