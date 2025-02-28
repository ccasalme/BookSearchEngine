import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: string;
  username: string;
  email: string;
}

const secretKey = process.env.JWT_SECRET_KEY || 'defaultsecret';

export const signToken = ({ _id, username, email }: JwtPayload) => {
  return jwt.sign({ _id, username, email }, secretKey, { expiresIn: '1h' });
};

// GraphQL authentication middleware (used in Apollo context)
export const authMiddleware = ({ req }: { req: any }) => {
  let token = req.headers.authorization || '';

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) return { user: null };

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return { user: decoded };
  } catch (err) {
    console.log('Invalid token:', err);
    return { user: null };
  }
};
