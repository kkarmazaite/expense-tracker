import { sendError } from "h3"
import { getCategoriesByAccountId } from "~~/server/db/categories"
import { H3Event } from "h3"
import { ICategory } from "~~/types/ICategory"

export default defineEventHandler(async (event: H3Event) => {
  const selectedAccountId = getCookie(event, 'selected_account')
  if(!selectedAccountId){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }
  const accountCategories:ICategory[] = await getCategoriesByAccountId(selectedAccountId) 
    
  return{
    "categories": accountCategories,
  }
})