'use server'

import { signIn, signOut } from '@/auth'
import { getDbInstance } from '@/db'
import { users } from '@/db/schema'
import { checkPassword, saltAndHashPassword } from '@/lib/password'
import { and, eq, isNull } from 'drizzle-orm'

const db = getDbInstance()

export async function signInGoogle() {
  try {
    const url = await signIn('google', { redirect: false })

    return url
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new Error('invalid error type')
    }

    return error.message
  }
}

export async function registerGoogle({
  email,
  name,
  tel,
}: {
  email: string
  name: string
  tel?: string | null
}) {
  try {
    const user: typeof users.$inferInsert = {
      email,
      name,
      tel,
      o_auth: 'google',
    }
    if (!db) {
      throw new Error('database is not connected')
    }

    const res = await db.insert(users).values(user).returning()

    return { data: res, error: undefined }
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new Error('invalid error type')
    }

    return { data: undefined, error: error.message }
  }
}

export async function signInCredentials({
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

export async function logOut() {
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
    }
    if (!db) {
      throw new Error('database is not connected')
    }

    const res = await db.insert(users).values(user).returning()

    await signInCredentials({ email, password })

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
    where: and(eq(users.email, email), isNull(users.o_auth)),
  })

  if (!user) {
    return
  }

  if (
    !user.o_auth &&
    user.encrypted_password &&
    (await checkPassword(password, user.encrypted_password))
  ) {
    return user
  }
}

export async function getGoogleUserFormDb({ email }: { email: string }) {
  if (!db) {
    throw new Error('database is not connected')
  }

  const user = await db.query.users.findFirst({
    where: and(eq(users.email, email), eq(users.o_auth, 'google')),
  })

  return user
}
