import * as bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10
export async function saltAndHashPassword(password: string) {
  const pwHash = await bcrypt.hash(password, SALT_ROUNDS)

  return pwHash
}

export async function checkPassword(
  password: string,
  encryptedPassword: string
) {
  return await bcrypt.compare(password, encryptedPassword)
}
