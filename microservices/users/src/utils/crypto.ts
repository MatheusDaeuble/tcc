import { createHmac } from 'crypto';

export const hashSha256 = (plainText: string): string =>
  createHmac('sha256', plainText).digest('hex');

export const hashPassword = (password: string): string => hashSha256(password);
