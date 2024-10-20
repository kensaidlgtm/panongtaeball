'use server'

import { signIn, signOut } from '@/auth'
import { getDbInstance } from '@/db'
import { users } from '@/db/schema'
import { checkPassword, saltAndHashPassword } from '@/lib/password'
import { eq } from 'drizzle-orm'

const db = getDbInstance()
export async function signInAction({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new Error('invalid error type')
    }

    return error.message
  }
}

export async function signOutAction() {
  try {
    await signOut({ redirect: false })
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new Error('invalid error type')
    }

    return error.message
  }
}

export async function register({
  email,
  password,
  name,
  tel,
}: {
  email: string
  password: string
  name: string
  tel: string
}) {
  try {
    const encryptedPassword = await saltAndHashPassword(password)
    const user: typeof users.$inferInsert = {
      email,
      name,
      encrypted_password: encryptedPassword,
      tel,
      rank: 'user',
    }
    if (!db) {
      throw new Error('database is not connected')
    }

    const res = await db.insert(users).values(user).returning()

    await signInAction({ email, password })

    return { data: res, error: undefined }
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new Error('invalid error type')
    }

    return { data: undefined, error: error.message }
  }
}

export async function getUserFromDb({
  email,
  password,
}: {
  email: string
  password: string
}) {
  if (!db) {
    throw new Error('database is not connected')
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (!user) {
    return
  }

  if (await checkPassword(password, user.encrypted_password)) {
    return user
  }
}
