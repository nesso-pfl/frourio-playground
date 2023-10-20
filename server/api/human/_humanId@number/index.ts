import { UpdateHuman } from '$/service/human'
import { Human } from '@prisma/client'

export type Methods = {
  get: {
    resBody: Human
  }
  put: {
    reqBody: UpdateHuman
    resBody: Human
  }
  delete: {
    status: 204
  }
}
