import { prisma } from '.'
import { IIcon } from '~~/types/IIcon'

export const createIcon = async(iconData: IIcon): Promise<IIcon | null> => {
  return prisma.icon.create({
    data: iconData,
  })
}

export const getAllIcons = (): Promise<IIcon[]> => {
  return prisma.icon.findMany()
}
