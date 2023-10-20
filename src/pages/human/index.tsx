import useAspidaSWR from '@aspida/swr'
import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '~/components/Layout'
import { Button } from '~/components/ui/button'
import { pagesPath } from '~/utils/$path'
import { apiClient } from '~/utils/apiClient'

const Page: NextPage = () => {
  const { data } = useAspidaSWR(apiClient.human)

  return (
    <Layout>
      <div className="flex items-center justify-between border-b pb-2">
        <h1 className="text-2xl">メンバー一覧</h1>
        <Button asChild>
          <Link href={pagesPath.human.new.$url()}>新規作成</Link>
        </Button>
      </div>
      {data ? (
        <ul className="mt-5 divide-y">
          {data.humans.map((human) => (
            <li key={human.id} className="flex items-center gap-3 py-2">
              <span className="w-[200px]">{human.name}</span>
              <span className="w-[50px]">{human.age}歳</span>
              <Button asChild className="ml-auto">
                <Link href={pagesPath.human._id(human.id).$url()}>詳細を見る</Link>
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div>loading...</div>
      )}
    </Layout>
  )
}

export default Page
