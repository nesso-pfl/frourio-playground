import dayjs from 'dayjs'
import { GetStaticProps, NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import Layout from '~/components/Layout'

type TimeStatus = 'new' | 'same' | 'different'
const showTimeStatus = (timeStatus: TimeStatus | undefined) => {
  return timeStatus
    ? {
        new: '初めて時刻を表示しました',
        same: '前回表示した時刻と同じです',
        different: '前回表示した時刻と異なります'
      }[timeStatus]
    : ''
}

const useTimeDifference = (timeFromServer: string) => {
  const [timeStatus, setTimeStatus] = useState<'new' | 'same' | 'different'>()
  const checked = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined' || checked.current) return

    checked.current = true
    const currentTimeFromSessionStorage = window.sessionStorage.getItem('fpl-fp/currentTime')
    if (currentTimeFromSessionStorage === null) {
      window.sessionStorage.setItem('fpl-fp/currentTime', timeFromServer)
      setTimeStatus('new')
    } else if (currentTimeFromSessionStorage === timeFromServer) {
      setTimeStatus('same')
    } else {
      window.sessionStorage.setItem('fpl-fp/currentTime', timeFromServer)
      setTimeStatus('different')
    }
  }, [timeFromServer])

  return { timeStatus }
}

type Props = {
  currentTime: string
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  console.log('ISR revalidated!')

  return {
    revalidate: 15,
    props: {
      currentTime: new Date().toISOString()
    }
  }
}

const Page: NextPage<Props> = ({ currentTime }) => {
  const { timeStatus } = useTimeDifference(currentTime)

  return (
    <Layout>
      <div className="flex items-center justify-between border-b pb-2">
        <h1 className="text-2xl">ISR Example</h1>
      </div>
      <p className="mt-8">このページでは15秒に一度 ISR による revalidation が発生し、その時点での時刻を表示します。</p>
      <p className="mt-4">{dayjs(currentTime).format('HH:mm:ss.SSS')}</p>
      <p>{showTimeStatus(timeStatus)}</p>
    </Layout>
  )
}

export default Page
