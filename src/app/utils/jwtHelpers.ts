import { SignJWT, jwtVerify } from 'jose';

const generateToken = async (
  payload: {
    _id: string;
    email: string;
    role: string;
  },
  secret: string,
  expiresIn: string,
) => {
  const encodedSecret = new TextEncoder().encode(secret);

  const token = await new SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setExpirationTime(expiresIn)
    .sign(encodedSecret);

  return token;
};

const verifyToken = async (token: string, secret: string) => {
  const encodedSecret = new TextEncoder().encode(secret);

  return await jwtVerify(token, encodedSecret, { algorithms: ['HS256'] });
};

export const jwtHelpers = { generateToken, verifyToken };
