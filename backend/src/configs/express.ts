import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from '../routes/user.route';
import shortcutRoute from '../routes/shortcut.route';
import sgidRoute from '../routes/sgid.route';
import { corsConfig } from './cors';
import { responseHeaders } from '../middlewares/responseHeaders';
const app: Application = express();

app.use(express.json()); // Middleware to parse incoming requests with JSON
app.use(cors(corsConfig)); // Middleware for cors config
app.use(cookieParser()); // Middleware for parsing cookies

// Common Header Middleware
app.use(responseHeaders)

app.get('/api', (req, res) => res.status(200).json({code: 200, message: 'API Pinged'}))
app.use('/api/users', userRoute);
app.use('/api/shortcuts', shortcutRoute);
app.use('/api/oauth/sgid', sgidRoute);

export default app;
