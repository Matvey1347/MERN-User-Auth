import { UserModel } from '../models/User';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { PassportStatic } from 'passport';
import { Response } from 'express';
import { MESSAGES } from '../utils/messages';

interface JwtPayload {
  userId: string;
}

if (!process.env.JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined in environment variables');
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
};

export const configurePassport = (passport: PassportStatic, res: Response): void => {
  passport.use(
    new JwtStrategy(options, async (payload: JwtPayload, done) => {
      try {
        const user = await UserModel.findById(payload.userId);

        if (user) {
          return done(null, user.toObject());
        } else {
          return done(null, false);
        }
      } catch (error) {
        console.error(error);
        return done(error, false);
      }
    })
  );
};