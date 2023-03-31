
import { getAllIcons } from "~~/server/db/icons"

export default defineEventHandler(async () => {

  const icons = await getAllIcons() 
    
  return{
    "icons": icons,
  }
})