import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http'
import * as schema from './schema'
let db: NeonHttpDatabase<typeof schema> | null = null

export function getDbInstance() {
  if (!db && process.env.DATABASE_URL) {
    db = drizzle(process.env.DATABASE_URL, {
      schema,
    })

    console.log('Connected to database !')
  }

  return db
}
