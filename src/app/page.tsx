import { auth } from '@/auth'
import MainContent from './_components/MainContent'

export default async function Home() {
  const session = await auth()

  return <MainContent session={session} />
}
