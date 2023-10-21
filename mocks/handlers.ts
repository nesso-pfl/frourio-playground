import { DefaultBodyType, rest } from 'msw'
import { apiClient } from '~/utils/apiClient'

type Method = keyof typeof rest
type Status = number

const delayMs = process.env.NODE_ENV === 'test' ? 0 : 300

type CreateHandlerOption<Response> = Partial<{
  response: Response
  onRequest: () => unknown
}>
const createHandler = (path: string, method: Method, status: Status, options?: CreateHandlerOption<DefaultBodyType>) =>
  rest[method](path, (_, res, ctx) => {
    if (options?.onRequest) options.onRequest()
    return res(ctx.status(status), ctx.delay(delayMs), ctx.json(options?.response))
  })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getWith200 = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  U extends { $path: () => string } & Record<'$get', (args: any) => unknown>
>(
  path: U,
  options?: CreateHandlerOption<
    ReturnType<U['$get']> extends Promise<infer S> ? (S extends DefaultBodyType ? S : never) : never
  >
) => createHandler(path.$path(), 'get', 200, options)

export const handlers = [
  getWith200(apiClient.human._humanId(':id' as unknown as number), { response: { id: 1, name: '田中 太郎', age: 26 } })
]
