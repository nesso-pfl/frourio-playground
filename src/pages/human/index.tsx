import { NextPage } from 'next'
import Layout from '~/components/Layout'
import { Button } from '~/components/ui/button'

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between border-b pb-2">
        <h1 className="text-2xl">メンバー一覧</h1>
        <Button>新規作成</Button>
      </div>
      <ul className="mt-5 divide-y">
        <li className="flex items-center gap-3 py-2">
          <span className="w-[100px]">田中 太郎</span>
          <span className="w-[50px]">26 歳</span>
          <Button className="ml-auto">編集</Button>
        </li>
        <li>
          <span>田中 太郎</span>
          <span>26 歳</span>
          <Button>編集</Button>
        </li>
        <li>
          <span>田中 太郎</span>
          <span>26 歳</span>
          <Button>編集</Button>
        </li>
      </ul>
    </Layout>
  )
}

export default Page
