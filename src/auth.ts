import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getUserFromDb } from './app/actions'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // logic to salt and hash password
        // const pwHash = await saltAndHashPassword(credentials.password as string)

        // logic to verify if the user exists
        const dbUser = await getUserFromDb({
          email: credentials.email as string,
          password: credentials.password as string,
        })
        if (!dbUser) {
          throw new Error('user not found')
        }

        return {
          id: dbUser.id.toString(),
          name: dbUser.name,
          email: dbUser.email,
        }
      },
    }),
  ],
})
