import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}