import { Human, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const findHuman = async (id: number): Promise<Human | undefined> => {
  return (
    (await prisma.human.findFirst({
      where: { id }
    })) ?? undefined
  )
}
