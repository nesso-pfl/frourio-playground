export type UserInfo = {
  id: string
  name: string
  icon: string
}

export type AuthHeader = {
  authorization: string
}

type DatetimeString = string
export type DateToString<T> = T extends Date
  ? DatetimeString
  : T extends Record<string, unknown> | unknown[]
  ? { [K in keyof T]: DateToString<T[K]> }
  : T
export type Response<T extends Record<string, unknown>> = DateToString<T>
