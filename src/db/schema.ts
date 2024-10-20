import { isNull } from 'drizzle-orm'
import {
  integer,
  pgTable,
  varchar,
  timestamp,
  pgEnum,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

export type OAuth = 'google' | 'facebook'
export type Role = 'owner' | 'member' | 'user'
export function isRole(value: unknown): value is Role {
  if (typeof value !== 'string') {
    return false
  }

  return ['owner', 'member', 'user'].includes(value)
}

export const roleEnum = pgEnum('role', ['owner', 'member', 'user'])
export const oAuthEnum = pgEnum('o_auth', ['google', 'facebook'])
export const users = pgTable(
  'users',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    tel: varchar({ length: 255 }),
    encrypted_password: varchar({ length: 255 }),
    role: roleEnum().notNull().default('user'),
    member_id: varchar({ length: 255 }).unique(),
    o_auth: oAuthEnum(),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().defaultNow().notNull(),
  },
  (users) => ({
    uniqueEmailWithNullOAuth: uniqueIndex('unique_email_with_null_oauth')
      .on(users.email)
      .where(isNull(users.o_auth)),

    uniqueEmailOAuthCombination: uniqueIndex(
      'unique_email_oauth_combination'
    ).on(users.email, users.o_auth),
  })
)
