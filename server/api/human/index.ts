import { CreateHuman } from '$/service/human'
import { Human } from '@prisma/client'

export type Methods = {
  get: {
    resBody: { humans: Human[] }
  }
  post: {
    reqBody: CreateHuman
    resBody: Human
  }
}
