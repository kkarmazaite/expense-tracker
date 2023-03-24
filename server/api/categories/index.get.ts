import { sendError } from "h3"
import { getCategoriesByAccountId } from "~~/server/db/categories"

export default defineEventHandler(async (event) => {
  const selectedAccountId = getCookie(event, 'selected_account')
  const dateFrom = getCookie(event, 'date_from')
  const dateTo = getCookie(event, 'date_to')

  const startDate = new Date(dateFrom as string);
  const endDate = new Date(dateTo as string);

  if(!selectedAccountId){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }
  const accountCategories = await getCategoriesByAccountId(selectedAccountId, startDate, endDate) 
    
  return{
    "categories": accountCategories,
  }
})