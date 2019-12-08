import express from 'express';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/user';

const app = express();
export default app;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
