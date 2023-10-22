import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import Layout from '~/components/Layout'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { pagesPath } from '~/utils/$path'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
  const router = useRouter()
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<Form>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = useCallback(
    async (formValues: Form) => {
      await apiClient.human.post({ body: formValues })
      toast({ title: `${formValues.name}(${formValues.age})を作成しました` })
      await router.push(pagesPath.human.$url())
    },
    [router, toast]
  )

  return (
    <Layout>
      <div className="border-b pb-2">
        <h1 className="text-2xl">メンバー新規作成</h1>
      </div>
      <form className="max-w-sm mt-8 mx-auto" name="メンバー新規作成フォーム" onSubmit={handleSubmit(onSubmit)}>
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
    </Layout>
  )
}

export default Page
