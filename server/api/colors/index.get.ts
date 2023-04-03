
import { getAllColors } from "~~/server/db/colors"

export default defineEventHandler(async () => {

  const colors = await getAllColors() 
    
  return{
    "colors": colors,
  }
})