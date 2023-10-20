import Fastify, { FastifyServerFactory } from 'fastify'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'
import { API_BASE_PATH } from '$/service/envValues'
import server from '$/$server'

export const init = (serverFactory?: FastifyServerFactory) => {
  const app = Fastify({ serverFactory })
  app.register(helmet, { crossOriginResourcePolicy: false })
  app.register(cors)
  server(app, { basePath: API_BASE_PATH })
  return app
}
