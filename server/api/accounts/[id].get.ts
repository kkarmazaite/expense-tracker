import { sendError } from "h3"
import { getAccountById } from "~~/server/db/accounts"
import { getCategoriesByAccountId } from "~~/server/db/categories"
import { H3Event } from "h3"
import { IAccount } from "~~/types/IAccount"
import { ICategory } from "~~/types/ICategory"

export default defineEventHandler(async (event: H3Event) => {
    const accountId = await event.context.params.id

    if(!accountId){
        return sendError(event, createError({statusCode: 400, statusMessage: 'Invalid parameters'}))
    }

    const account:IAccount | null = await getAccountById(accountId)
    const accountCategories: ICategory[] | null = await getCategoriesByAccountId(accountId)

    return {
        account: account,
        accountCategories: accountCategories
    }
})