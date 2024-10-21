import NextAuth, { DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import {
  getGoogleUserFormDb,
  getUserFromDb,
  registerGoogle,
} from './app/actions'
import { isRole, Role } from './db/schema'
import Google from 'next-auth/providers/google'

declare module 'next-auth' {
  interface Session {
    user: {
      role: Role
      memberId: string | null
    } & DefaultSession['user']
  }

  interface User {
    role: Role
    memberId: string | null
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      async profile(profile) {
        const dbUser = await getGoogleUserFormDb({
          email: profile.email,
        })

        if (!dbUser) {
          const email = profile?.email
          const name = profile?.name
          const tel = profile?.phone_number

          const u = await registerGoogle({
            email,
            name,
            tel,
          })
          return {
            ...profile,
            role: u.data?.[0].role,
            memberId: u.data?.[0].member_id,
          }
        }
        return { ...profile, role: dbUser.role, memberId: dbUser.member_id }
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
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
          role: dbUser.role,
          memberId: dbUser.member_id,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.memberId = user.memberId
      }
      return token
    },
    async signIn(params) {
      if (params.account?.provider !== 'credentials') {
        const email = params.profile?.email
        const name = params.profile?.name
        const tel = params.profile?.phone_number
        if (!email || !name) {
          throw new Error('google profile not found')
        }
        try {
          await registerGoogle({
            email,
            name,
            tel,
          })

          return true
        } catch (error) {
          if (!(error instanceof Error)) {
            throw new Error('invalid error type')
          }

          throw new Error(error.message)
        }
      }

      return true
    },
    redirect() {
      return '/'
    },
    session({ session, token }) {
      if (isRole(token.role)) {
        session.user.role = token.role
      }

      session.user.memberId = token.memberId as string | null

      return session
    },
  },
})
