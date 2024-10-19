'use server'

import { signIn } from '@/auth'
import { getDbInstance } from '@/db'
import { usersTable } from '@/db/schema'

const db = getDbInstance()

export async function signInAction(formData: FormData) {
  console.log('formData: ', formData)

  await signIn('credentials', formData)
}

export async function getUserFromDb(
  userName: string,
  encryptedPassword: string
) {
  const user: typeof usersTable.$inferInsert = {
    userName: userName,
    encrypted_password: encryptedPassword,
    phone: '0886295902',
    rank: 'owner',
  }
  if (db) {
    await db.insert(usersTable).values(user)
  }

  return { email: '1', password: '2' }
}
