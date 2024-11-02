import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AdminContent from './_components/AdminContent'

export default async function AdminPage() {
  const session = await auth()

  const role = session?.user.role

  if (role !== 'owner') {
    redirect('/')
  }

  return <AdminContent />
}
