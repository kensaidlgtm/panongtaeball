import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http'

let db: NeonHttpDatabase | null = null

export function getDbInstance() {
  if (!db && process.env.DATABASE_URL) {
    db = drizzle(process.env.DATABASE_URL)
    console.log('Connected to database !')
  }

  return db
}
