import express from 'express';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/user';
import { noMatchRouteHandler, resultHandler, errorHandler } from './routes/middlewares/response-handler';

const app = express();
export default app;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);

app.use(noMatchRouteHandler);
app.use(resultHandler);
app.use(errorHandler);
