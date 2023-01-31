import { IToken } from "~~/types/IToken"
import { prisma } from "."

export const createRefreshToken = (refreshToken:IToken): Promise<IToken | null> => {
  return prisma.refreshToken.create({
    data: refreshToken,
  })

}
export const getRefreshTokenByToken = (token: string | undefined): Promise<IToken | null> => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  })
}
export const removeRefreshToken = (token: string | undefined): Promise<IToken | null> => {
  return prisma.refreshToken.delete({
    where: {
      token: token,
    },
  })
}