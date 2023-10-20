import { deleteHuman, updateHuman } from '$/service/human'
import { findHuman } from '$/service/human/findHuman'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ params }) => {
    const human = await findHuman(params.humanId)
    return human ? { status: 200, body: human } : { status: 404 }
  },
  put: async ({ body, params }) => {
    const newHuman = await updateHuman(params.humanId, body)
    return { status: 200, body: newHuman }
  },
  delete: async ({ params }) => {
    await deleteHuman(params.humanId)
    return { status: 204 }
  }
}))
