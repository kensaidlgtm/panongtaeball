import {
  integer,
  pgTable,
  varchar,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core'
export const rankEnum = pgEnum('rank', ['owner', 'member', 'user'])
export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userName: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 255 }).notNull(),
  encrypted_password: varchar({ length: 255 }).notNull(),
  rank: rankEnum().notNull().default('user'),
  member_id: varchar({ length: 255 }).unique(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
})
