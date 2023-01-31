import { sendError } from "h3"
import { getCategoriesByAccountId } from "~~/server/db/categories"

export default defineEventHandler(async (event) => {
  const selectedAccountId = getCookie(event, 'selected_account')
  if(!selectedAccountId){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }
  const accountCategories = await getCategoriesByAccountId(selectedAccountId) 
    
  return{
    "categories": accountCategories,
  }
})