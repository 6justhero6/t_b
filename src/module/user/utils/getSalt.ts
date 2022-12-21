import * as crypto from 'crypto';

export const getSalt = () => {
  return crypto.randomBytes(16).toString('hex');
};
