import express, { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import { configurePassport } from './config/passport';
import { responseMiddleware } from './middleware/response-middleware';
import { authenticateJwt } from './middleware/authenticate-jwt';

import { router as authRoutes } from './routes/auth';
import { router as userRoutes } from './routes/user';


const app = express();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_URL)
  .then(() => console.log('MongoDB connect'))
  .catch(error => console.log("MongoDB ", error))

// app.use(cors({
//   origin: [/^http:\/\/localhost:5173/],
//   credentials: true
// }));

app.use(cors())

app.use(express.json());
app.use(morgan('dev'));

app.use((req: Request, res: Response, next: NextFunction) => {
  configurePassport(passport, res);
  next();
});
app.use(passport.initialize());

app.use(responseMiddleware);

app.get("/", authenticateJwt, (req, res) => {
  res.send("Welcome auth");
})

app.use('/api/auth', authRoutes);
app.use('/api/user', authenticateJwt, userRoutes);

export default app;