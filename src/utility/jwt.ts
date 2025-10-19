import jwt from 'jsonwebtoken';
import { IUserForm } from '../app/modules/authentication/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const generateToken = (user: IUserForm): string => {
  const payload = {
    id: user._id.toString(), // Convert ObjectId to string
    email: user.email
  };

  return jwt.sign(
    payload,
    JWT_SECRET,
    { 
      expiresIn: JWT_EXPIRES_IN 
    } as jwt.SignOptions // Type assertion
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};