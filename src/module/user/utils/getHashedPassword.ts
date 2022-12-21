import { getSalt } from '@module/user/utils/getSalt';
import { hashPassword } from '@module/user/utils/hashPassword';

export const getHashedPassword = (password) => {
  const salt = getSalt();
  const hashedPassword = hashPassword(password, salt);
  return `${hashedPassword}:${salt}`;
};
