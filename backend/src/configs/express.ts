import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from '../routes/user.route';
import shortcutRoute from '../routes/shortcut.route';
import { corsConfig } from './cors';
const app: Application = express();

app.use(express.json()); // Middleware to parse incoming requests with JSON
app.use(cors(corsConfig)); // Middleware for cors config
app.use(cookieParser()); // Middleware for parsing cookies

app.use('/api/users', userRoute);
app.use('/api/shortcuts', shortcutRoute);

export default app;
