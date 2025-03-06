import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { UserModel } from '../models/User';
import { MESSAGES } from '../utils/messages';
import { sendTokenResponse } from '../utils/functions/send-token-res';
import { validateUserData } from '../utils/functions/validate-user-data';
import validator from 'validator';
import { hashedPassword } from '../utils/functions/hashed-password';



export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    let user = await UserModel.findOne({ email });

    if (user) return res.sendResponse(400, MESSAGES.AUTH.USER_ALREADY_EXISTS);

    const isValid = validateUserData(res, req.body);
    if (!isValid) {
      return;
    }
    
    user = new UserModel({ name, email, password });

    user.password = await hashedPassword(password);
    await user.save();

    return sendTokenResponse(res, user);
  } catch (error) {
    console.log(error);
    return res.sendResponse(500, MESSAGES.SERVER.INTERNAL_ERROR);
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {

    const isValid = validateUserData(res, req.body, ['email', 'password']);
    if (!isValid) return;

    let user = await UserModel.findOne({ email });

    if (!user) return res.sendResponse(400, MESSAGES.AUTH.USER_NOT_FOUND);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.sendResponse(400, MESSAGES.VALIDATION.INVALID_PASSWORD);

    return sendTokenResponse(res, user);
  } catch (error) {
    console.log(error);
    return res.sendResponse(500, MESSAGES.SERVER.INTERNAL_ERROR);
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    if (!validator.isEmail(email)) return res.sendResponse(400, MESSAGES.VALIDATION.INVALID_EMAIL);

    const user = await UserModel.findOne({ email });

    if (!user) return res.sendResponse(400, MESSAGES.AUTH.USER_NOT_FOUND);

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
    const RESET_PASSWORD_EXPIRATION = process.env.RESET_PASSWORD_EXPIRATION;

    const passwordToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET_KEY,
      { expiresIn: parseInt(RESET_PASSWORD_EXPIRATION || '3600') }
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${passwordToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Password',
      text: `Follow the link to reset your password: ${resetLink}`,
      html: `<p>Follow the <a href="${resetLink}">link</a> to reset your password.</p>`,
    });

    return res.sendResponse(200, MESSAGES.AUTH.EMAIL_WITH_LINK_SEND);
  } catch (error) {
    console.log(error);
    return res.sendResponse(500, MESSAGES.SERVER.INTERNAL_ERROR);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword, confirmNewPassword } = req.body;

  try {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const userId = (decoded as JwtPayload).userId;

    if (!newPassword) return res.sendResponse(400, MESSAGES.VALIDATION.REQUIRED_NEW_PASSWORD);
    if (!confirmNewPassword) return res.sendResponse(400, MESSAGES.VALIDATION.REQUIRED_CONFIRM_NEW_PASSWORD);
    if (confirmNewPassword !== newPassword) return res.sendResponse(400, MESSAGES.VALIDATION.PASSWORDS_NOT_MATCH);

    if (!validator.isStrongPassword(newPassword)) return res.sendResponse(400, MESSAGES.VALIDATION.NOT_STRONG_PASSWORD);

    if (userId) {
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.sendResponse(400, MESSAGES.AUTH.USER_NOT_FOUND);
      }

      user.password = await hashedPassword(newPassword);
      await user.save();

      res.sendResponse(200, MESSAGES.AUTH.PASSWORD_CHANGED);
    }

  } catch (error) {
    console.log(error);
    return res.sendResponse(500, MESSAGES.SERVER.INTERNAL_ERROR);
  }
};