import { Response, Request, NextFunction } from 'express';

export interface ErrorResponse {
  status: number;
  message: string;
}

declare module 'express-serve-static-core' {
  interface Response {
    sendResponse: <T>(status: number, body: T | string) => void;
  }
}

function responseMiddleware(req: Request, res: Response, next: NextFunction) {
  res.sendResponse = function <T>(status: number, body: T | string): void {
    if (typeof body === 'string') {
      res.status(status).json({
        status,
        message: body,
      } as ErrorResponse);
    } else {
      res.status(status).json({
        status,
        ...body,
      });
    }
  };

  next();
}

export { responseMiddleware };