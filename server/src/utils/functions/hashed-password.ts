import bcrypt from 'bcrypt';

export async function hashedPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt)
}