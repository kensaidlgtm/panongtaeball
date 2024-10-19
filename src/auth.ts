import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { saltAndHashPassword } from './lib/password'
import { getUserFromDb } from './app/actions'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        userName: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        // logic to salt and hash password
        const pwHash = await saltAndHashPassword(credentials.password)

        console.log('authorize', credentials, pwHash)
        // logic to verify if the user exists
        user = await getUserFromDb(credentials.userName, pwHash)

        if (!user) {
          throw new Error('User not found.')
        }

        return user
      },
    }),
  ],
})
