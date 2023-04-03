import { sendError } from "h3"
import { createColor } from "~~/server/db/colors"
import { IColor } from "~~/types/IColor"

export default defineEventHandler(async (event) => {

  const { name, hexCode }:IColor= await readBody(event)

  if(!name || !hexCode){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }

  const colorData = {
    name,
    hexCode,
  }

  const color = await createColor(colorData)

  return {
    body: color,
  }
})