import {prisma} from '.'
import bcrypt from 'bcrypt'

//Todo type
export const createUser = (userData: any) => {
    const finalUserData = {
        ...userData,
        password: bcrypt.hashSync(userData.password, 10)
    }
    return prisma.user.create({
        data: finalUserData
    })
}

export const getUserByEmail = (email: string) => {
    return prisma.user.findUnique({
        where:{
            email
        }
    })
}

export const getUserById = (userId: any) => {
    return prisma.user.findUnique({
        where:{
            id: userId
        }
    })
}