import useAspidaSWR from '@aspida/swr'
import { zodResolver } from '@hookform/resolvers/zod'
import { NextPage } from 'next'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Layout from '~/components/Layout'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { pagesPath } from '~/utils/$path'
import { apiClient } from '~/utils/apiClient'
import { useToast } from '~/components/ui/use-toast'

const formSchema = z.object({
  name: z.string().min(1, '入力必須です'),
  age: z
    .number()
    .min(0, '不正な値です')
    .or(z.nan().refine(() => false, '入力必須です'))
})

type Form = z.infer<typeof formSchema>

const Page: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { mutate: refetchHumans } = useAspidaSWR(apiClient.human)
  const { data, mutate } = useAspidaSWR(apiClient.human._humanId(params ? +params.id : 0), {
    key: params ? params.id : null,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    onSuccess: (data) => {
      reset(data)
    }
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm<Form>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = useCallback(
    async (formValues: Form) => {
      await apiClient.human._humanId(+params.id).$put({ body: formValues })
      refetchHumans()
      await mutate()
      toast({ description: '更新しました' })
      setIsOpen(false)
    },
    [apiClient, params, toast, mutate]
  )

  const handleDelete = useCallback(async () => {
    await apiClient.human._humanId(+params.id).delete()
    await router.push(pagesPath.human.$url())
  }, [apiClient, router, pagesPath])

  return (
    <Layout>
      <div className="flex items-center border-b pb-2">
        <h1 className="text-2xl">メンバー詳細</h1>
      </div>
      <div className="max-w-sm mt-8 mx-auto">
        {data ? (
          <dl className="grid grid-cols-2 gap-3">
            <dt>氏名</dt>
            <dd>{data.name}</dd>
            <dt>年齢</dt>
            <dd>{data.age}歳</dd>
          </dl>
        ) : (
          <div>loading...</div>
        )}
        {data && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="w-full mt-8" asChild>
              <Button>編集</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {data?.name}({data?.age})を編集
                </DialogTitle>
                <DialogDescription asChild>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                      <Label>
                        氏名
                        <Input className="mt-2" {...register('name')} />
                        {errors.name && <p className="mt-2 text-red-500">{errors.name.message}</p>}
                      </Label>
                      <Label>
                        年齢
                        <Input className="mt-2" type="number" {...register('age', { valueAsNumber: true })} />
                        {errors.age && <p className="mt-2 text-red-500">{errors.age.message}</p>}
                      </Label>
                    </div>
                    <Button className="mt-8 w-full" disabled={isSubmitting}>
                      作成
                    </Button>
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
        {data && (
          <AlertDialog>
            <AlertDialogTrigger className="w-full mt-8" asChild>
              <Button variant="destructive" className="w-full">
                削除
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {data?.name}({data?.age})を削除します
                </AlertDialogTitle>
                <AlertDialogDescription>この操作は巻き戻しできません。よろしいですか？</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>削除</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </Layout>
  )
}

export default Page
