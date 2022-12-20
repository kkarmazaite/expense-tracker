import { userTransformer } from "~~/server/transformers/user"
import { H3Event } from "h3"

export default defineEventHandler(async (event: H3Event) => {

    return{
        user: userTransformer(event.context.auth?.user)
    }
})