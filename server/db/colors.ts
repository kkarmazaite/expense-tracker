import { prisma } from '.'
import { IColor } from '~~/types/IColor'

export const createColor = async(colorData: IColor): Promise<IColor | null> => {
  return prisma.color.create({
    data: colorData,
  })
}

export const getAllColors = (): Promise<IColor[]> => {
  return prisma.color.findMany()
}
