import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import Layout from '~/components/Layout'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { pagesPath } from '~/utils/$path'

const Page: NextPage = () => {
  const router = useRouter()
  const handleSubmit = useCallback(() => {
    // TODO: ここで新規作成処理を実装する
    router.push(pagesPath.human.$url())
  }, [router])

  return (
    <Layout>
      <div className="border-b pb-2">
        <h1 className="text-2xl">メンバー新規作成</h1>
      </div>
      <form className="max-w-sm mt-8 mx-auto" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <Label>
            氏名
            <Input className="mt-3" />
          </Label>
          <Label>
            年齢
            <Input className="mt-3" />
          </Label>
        </div>
        <Button className="mt-8 w-full">作成</Button>
      </form>
    </Layout>
  )
}

export default Page
