import { IToken } from "~~/types/IToken"
import { prisma } from "."

export const createRefreshToken = (refreshToken:IToken) => {
    return prisma.refreshToken.create({
        data: refreshToken
    })

}
export const getRefreshTokenByToken = (token: string | undefined) => {
    return prisma.refreshToken.findUnique({
        where: {
            token
        }
    })
}
export const removeRefreshToken = (token: string | undefined) => {
    return prisma.refreshToken.delete({
        where: {
            token: token
        }
    })
}