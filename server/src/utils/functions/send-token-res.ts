import { Response } from 'express';
import { User } from "../../models/User";
import jwt from "jsonwebtoken";

export const sendTokenResponse = (res: Response, user: User) => {
  const jwtKey = process.env.JWT_SECRET_KEY || "";
  const expiresIn = process.env.TOKEN_EXPIRATION || "3d";

  const token = jwt.sign(
    { userId: user._id },
    jwtKey,
    {
      expiresIn: expiresIn as jwt.SignOptions['expiresIn']
    }
  );
  res.status(200).json({ token, user });
}