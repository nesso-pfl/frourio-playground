import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const deleteHuman = async (id: number) => {
  return await prisma.human.delete({
    where: { id }
  })
}
