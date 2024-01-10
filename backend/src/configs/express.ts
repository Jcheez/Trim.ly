import express, { Application } from 'express';
import cors from 'cors';
import userRoute from '../routes/user.route';
import shortcutRoute from '../routes/shortcut.route';
import { verifyJWT } from '../middlewares/verifyJWT';
import { decryptJWT } from '../middlewares/decryptJWT';
import { corsConfig } from './cors';
const app: Application = express();

app.use(express.json()); // Middleware to parse incoming requests with JSON
app.use(cors(corsConfig)); // Middleware for cors config

// Routes below are public
app.use('/api/users', userRoute);

// Initialise verifyJWT middleware
app.use(decryptJWT, verifyJWT);

// Routes below this will be required to have a JWT Token
app.use('/api/shortcuts', shortcutRoute);

export default app;
