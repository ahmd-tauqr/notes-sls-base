import { getUserByEmail, createUser, validatePassword, hashPassword } from '../models/userModel';

export const signUp = async (user: any) => {
  const existingUser = await getUserByEmail(user.email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  user.password = hashPassword(user.password);
  return await createUser(user);
};

export const signIn = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user || !validatePassword(password, user.password)) {
    throw new Error('Invalid email or password');
  }

  return user;
};