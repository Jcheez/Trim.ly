import { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Username is missing']
  },

  email: {
    type: String,
    required: [true, 'Email field missing']
  },

  password: {
    type: String
  },

  refreshToken: {
    type: String
  },

  createdOn: {
    type: Date,
    default: Date.now()
  }
});

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
