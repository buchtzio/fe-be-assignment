import bcrypt from 'bcryptjs';

type User = {
  id: string;
  username: string;
  password: string;
  role: string;
};

export const users: User[] = [];

export const createMockUsers = async () => {
  const adminPass = await bcrypt.hash('adminPass', 10);
  const userPass = await bcrypt.hash('userPass', 10);

  users.push({ id: '1', username: 'admin', password: adminPass, role: 'admin' });
  users.push({ id: '2', username: 'user', password: userPass, role: 'user' });
};

export const findUserByUsername = (username: string): User | undefined => {
  return users.find((user) => user.username === username);
};
