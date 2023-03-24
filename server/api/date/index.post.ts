import { sendError } from "h3"

export default defineEventHandler(async (event) => {

  const {
    dateFrom, dateTo,
  }:{dateFrom: string, dateTo:string} = await readBody(event)

  if(!dateFrom || !dateTo){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }

  setCookie(event, "date_from", dateFrom, {
    httpOnly: true,
    sameSite: true,
  })

  setCookie(event, "date_to", dateTo, {
    httpOnly: true,
    sameSite: true,
  })

  return { message: 'Dates set' }
})