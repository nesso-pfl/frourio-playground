import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const listHuman = async () => {
  return await prisma.human.findMany()
}
