import { PrismaClient, Human } from '@prisma/client'
const prisma = new PrismaClient()

export type UpdateHuman = Pick<Human, 'name' | 'age'>

export const updateHuman = async (id: number, newHuman: UpdateHuman) => {
  return await prisma.human.update({
    data: newHuman,
    where: { id }
  })
}
