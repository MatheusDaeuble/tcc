/* eslint-disable import/prefer-default-export */
import { createHmac } from 'crypto';

export const hashSha256 = (plainText: string): string =>
  createHmac('sha256', plainText).digest('hex');

export const hashPassword = (password: string): string => hashSha256(password);

export const hashToken = (token: string): string => hashSha256(token);

export const comparePassword = (plainText: string, hashed: string): boolean =>
  hashPassword(plainText) === hashed;
