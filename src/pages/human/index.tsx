import useAspidaSWR from '@aspida/swr'
import { NextPage } from 'next'
import Layout from '~/components/Layout'
import { Button } from '~/components/ui/button'
import { apiClient } from '~/utils/apiClient'

const Page: NextPage = () => {
  const { data } = useAspidaSWR(apiClient.human)

  return (
    <Layout>
      <div className="flex items-center justify-between border-b pb-2">
        <h1 className="text-2xl">メンバー一覧</h1>
        <Button>新規作成</Button>
      </div>
      {data ? (
        <ul className="mt-5 divide-y">
          {data.humans.map((human) => (
            <li key={human.id} className="flex items-center gap-3 py-2">
              <span className="w-[100px]">田中 太郎</span>
              <span className="w-[50px]">26 歳</span>
              <Button className="ml-auto">編集</Button>
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
