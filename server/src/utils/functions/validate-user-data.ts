import validator from "validator";
import { Response } from 'express';
import { UserFields } from '../../models/User';
import { MESSAGES } from '../messages';

export const validateUserData = (
  res: Response,
  data: UserFields,
  requiredFields?: Array<keyof UserFields>
) => {
  const fieldsToCheck = requiredFields || Object.keys(data) as Array<keyof UserFields>;
  const { email, password } = data;

  for (const field of fieldsToCheck) {
    if (!data[field]) {
      res.sendResponse(400, MESSAGES.VALIDATION.ALL_FIELDS_REQUIRED);
      return false;
    }
  }

  if (email && !validator.isEmail(email)) {
    res.sendResponse(400, MESSAGES.VALIDATION.INVALID_EMAIL);
    return false;
  }

  if (password && !validator.isStrongPassword(password)) {
    res.sendResponse(400, MESSAGES.VALIDATION.NOT_STRONG_PASSWORD);
    return false;
  }

  return true;
}