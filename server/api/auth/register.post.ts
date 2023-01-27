import { sendError } from "h3"
import { createUser, getUserByEmail } from "~~/server/db/users"
import { userTransformer } from "~~/server/transformers/user"
import { H3Event } from "h3"
import { IUser } from "~~/types/IUser"

export default defineEventHandler(async (event: H3Event) => {

const body = await readBody(event)

const { email, password, repeatPassword, name}:IUser = body

if(!email || !password || !repeatPassword || !name){
    return sendError(event, createError({statusCode: 400, statusMessage: 'Invalid parameters'}))
}
const userExists = await getUserByEmail(email)
if(userExists){
    return sendError(event, createError({statusCode: 400, statusMessage: 'User with this email already exists'}))
}

if(password !== repeatPassword){
    return sendError(event, createError({statusCode: 400, statusMessage: 'Passwords do not match'}))
}

const userData = { email, password, name, profileImage: 'https://picsum.photos/200/200'}

const user = await createUser(userData)

return {
    user: userTransformer(user)
}
})