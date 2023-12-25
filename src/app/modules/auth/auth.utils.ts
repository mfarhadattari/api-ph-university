import jwt from 'jsonwebtoken';
import { IJWTPayload } from './auth.interface';

export const createJWTToken = (
  jwtPayload: IJWTPayload,
  jwtSecret: string,
  jwtConfig: Record<string, unknown>,
) => {
  const jwtToken = jwt.sign(jwtPayload, jwtSecret, jwtConfig);
  return jwtToken;
};
