import jwt from 'jsonwebtoken';

export const getDBURL = () => {
  const USER = process.env.MONGODB_USER || '';
  const PASS = process.env.MONGODB_PASS || '';
  const CLUSTER_URL = process.env.MONGODB_CLUSTER_URL || '';
  const DB = process.env.DATABASE || '';
  return DB?.replace(/<PASSWORD>/, PASS)
    .replace(/<USER>/, USER)
    .replace(/<CLUSTER>/, CLUSTER_URL);
};

export const jwtVerifyPromisified = (
  token: string,
  secret: jwt.Secret
): Promise<string | jwt.JwtPayload | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, {}, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};

export const getTokenFormHeader = (authToken: string | undefined): string | null => {
  if (authToken) {
    const tokenWithBearerString = authToken?.split(' ');
    if (tokenWithBearerString[0] === 'Bearer') {
      return tokenWithBearerString[1];
    }
  }

  return null;
};
