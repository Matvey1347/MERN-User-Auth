import { SimpleRes } from "./Types"

export interface UserLoginFileds {
  email: string,
  password: string
}

export interface UserFileds extends UserLoginFileds {
  name: string
}

export interface User extends UserFileds {
  _id: string
}

export interface GetUser extends SimpleRes, User { }


export interface GetTokenRes {
  token: string,
  user: User
}

export interface ForgotPasswordFileds {
  email: string;
}

export interface ResetPasswordFileds {
  newPassword: string;
  token: string;
}