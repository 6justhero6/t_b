import * as crypto from 'crypto';

export const hashPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 100, 16, 'sha512').toString('hex');
};
