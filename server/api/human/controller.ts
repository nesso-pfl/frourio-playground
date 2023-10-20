import { createHuman, listHuman } from '$/service/human'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async () => {
    const humans = await listHuman()
    return { status: 200, body: { humans } }
  },
  post: async ({ body }) => {
    const newHuman = await createHuman(body)
    return { status: 201, body: newHuman }
  }
}))
