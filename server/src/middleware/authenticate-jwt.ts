import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { User } from '../models/User';
import { MESSAGES } from '../utils/messages';

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: User) => {
    if (err) {
      return res.sendResponse(500, MESSAGES.SERVER.INTERNAL_ERROR);
    } else if (!user) {
      return res.sendResponse(401, MESSAGES.AUTH.UNAUTHORIZED);
    }
    req.user = user;
    next();
  })(req, res, next);
};