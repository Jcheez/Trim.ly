import mongoose from 'mongoose';
import { MONGO_DB_URL } from '../utils/constants';

const mongoUrl = MONGO_DB_URL;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Connection has been established with DB');
  })
  .catch((err) => {
    console.log(`Error with connecting to DB: ${err}`);
  });
