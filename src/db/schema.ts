import {
  integer,
  pgTable,
  varchar,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core'
export const rankEnum = pgEnum('rank', ['owner', 'member', 'user'])
export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  tel: varchar({ length: 255 }).notNull(),
  encrypted_password: varchar({ length: 255 }).notNull(),
  rank: rankEnum().notNull().default('user'),
  member_id: varchar({ length: 255 }).unique(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
})
