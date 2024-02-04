import { CorsOptions } from 'cors';
import { CORS_ORIGIN } from '../utils/constants';

export const corsConfig: CorsOptions = {
  origin: CORS_ORIGIN,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true
};
