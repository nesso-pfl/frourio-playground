import type { OptionalQuery as OptionalQuery0 } from '../pages/article'
import type { Query as Query1 } from '../pages/article/entry'

export const pagesPath = {
  "article": {
    "entry": {
      $url: (url: { query: Query1, hash?: string }) => ({ pathname: '/article/entry' as const, query: url.query, hash: url.hash })
    },
    $url: (url?: { query?: OptionalQuery0, hash?: string }) => ({ pathname: '/article' as const, query: url?.query, hash: url?.hash })
  },
  "human": {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/human/[id]' as const, query: { id }, hash: url?.hash })
    }),
    "new": {
      $url: (url?: { hash?: string }) => ({ pathname: '/human/new' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/human' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  favicon_png: '/favicon.png',
  vercel_svg: '/vercel.svg'
} as const

export type StaticPath = typeof staticPath
