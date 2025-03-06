import { AxiosError } from "axios"

export interface SimpleRes {
  status: number
}

export interface ResMessage extends SimpleRes {
  message: string
}

export interface ResError extends AxiosError<ResMessage> {}