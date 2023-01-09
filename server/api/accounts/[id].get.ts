import { sendError } from "h3"
import { getAccountById } from "~~/server/db/accounts"
import { H3Event } from "h3"
import { IAccount } from "~~/types/IAccount"

export default defineEventHandler(async (event: H3Event) => {
    const accountId = await event.context.params.id

    if(!accountId){
        return sendError(event, createError({statusCode: 400, statusMessage: 'Invalid parameters'}))
    }

    const account:IAccount | null = await getAccountById(accountId)

    return {
        account: account
    }
})