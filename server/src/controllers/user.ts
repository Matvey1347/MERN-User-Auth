import { Request, Response } from 'express';
import { User, UserModel } from '../models/User';
import { MESSAGES } from '../utils/messages';
import { sendTokenResponse } from '../utils/functions/send-token-res';
import { validateUserData } from '../utils/functions/validate-user-data';
import { hashedPassword } from '../utils/functions/hashed-password';

export const getUser = async (req: Request, res: Response) => {
  const { user } = req;

  if (user) {
    return res.sendResponse(200, { user });
  } else {
    return res.sendResponse(400, MESSAGES.AUTH.INVALID_TOKEN);
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const tokenUserId = (req.user as User)._id.toString();

  if (userId !== tokenUserId) {
    res.sendResponse(403, MESSAGES.ACCESS.DENIED);
  } else {
    await UserModel.findByIdAndDelete(userId);
    res.sendResponse(200, MESSAGES.PROFILE.USER_DELETED);
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const tokenUser = req.user as User;
  const tokenUserId = tokenUser._id.toString();

  const isValid = validateUserData(res, req.body, ['name', 'email']);
  if (!isValid) {
    return;
  }

  if (userId !== tokenUserId) {
    return res.sendResponse(403, MESSAGES.ACCESS.DENIED);
  } else {
    const hashedPas = (req.body.password) ? await hashedPassword(req.body.password) : tokenUser.password;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { ...req.body, password: hashedPas },
      { new: true }
    );

    sendTokenResponse(res, updatedUser as User);
  }
}