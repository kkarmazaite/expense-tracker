import { sendError } from "h3"
import { IIcon } from "~~/types/IIcon"
import { createIcon } from "~~/server/db/icons"

export default defineEventHandler(async (event) => {

  const { name }:IIcon= await readBody(event)

  if(!name){
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters', 
    }))
  }

  const iconData = {
    name,
  }

  const icon = await createIcon(iconData)

  return {
    body: icon,
  }
})