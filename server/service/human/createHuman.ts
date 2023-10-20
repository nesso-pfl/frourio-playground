import { PrismaClient, Human } from '@prisma/client'
const prisma = new PrismaClient()

export type CreateHuman = Pick<Human, 'name' | 'age'>

export const createHuman = async (newHuman: CreateHuman) => {
  return await prisma.human.create({
    data: newHuman
  })
}
