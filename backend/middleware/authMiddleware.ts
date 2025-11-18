import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types';

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ message: 'No token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
    req.user = decoded;

//     if (req.body && req.body.email) {
//       const email = req.body.email;
//       const parts = email.split('@');
//       const username = parts[0];
//       const domain = parts[1];

//       // Regex for alphanumeric only (letters A-Z and numbers 0-9)
//       const isAlphaNumeric = /^[a-zA-Z0-9]+$/.test(username);

//       if (
//         parts.length !== 2 ||        // Must contain exactly one "@"
//         domain !== 'gmail.com' ||    // Domain must be strictly gmail.com
//         !isAlphaNumeric              // Username must be letters/numbers only
//       ) {
//          res.status(400).json({ 
//            message: 'Invalid email: Must be a gmail.com address and contain only letters/numbers before the @.' 
//          });
//          return; 
//       }
//     }


    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;