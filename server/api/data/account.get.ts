import { sendError } from "h3"
import { geAccountByUserId } from "~~/server/db/accounts"
import { H3Event } from "h3"
import { IAccount } from "~~/types/IAccount"

export default defineEventHandler(async (event: H3Event) => {

const userId = await event.context.auth.user.id

if(!userId){
    return sendError(event, createError({statusCode: 400, statusMessage: 'Invalid parameters'}))
}

const userAccounts:IAccount[] = await geAccountByUserId(userId) 

return {
    accounts: userAccounts
}
})