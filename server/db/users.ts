import { prisma } from '.'
import bcrypt from 'bcrypt'
import { IUser } from '~~/types/IUser'

export const createUser = async(userData: IUser):Promise<IUser> => {
  const password = userData.password as string
  const encryptedPassword = await bcrypt.hash(password, 10)

  const finalUserData = {
    ...userData,
    password: encryptedPassword,
  }
  return prisma.user.create({
    data: finalUserData,
  })
}

export const getUserByEmail = (email: string):Promise<IUser | null> => {
  return prisma.user.findUnique({
    where:{
      email,
    },
  })
}

export const getUserById = (userId: string):Promise<IUser | null> => {
  return prisma.user.findUnique({
    where:{
      id: userId,
    },
  })
}