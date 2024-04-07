import { JwtPayload } from 'jsonwebtoken';
import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  refreshToken: string;
  createdOn: Date;
}

export interface registerUserReqBodyInterface {
  password: string;
  email: string;
  username: string;
}

export interface registerUserResBodyInterface {}

export interface loginUserReqBodyInterface {
  password: string;
  email: string;
}

export interface loginUserResBodyInterface {}

export interface retrieveUserProfileReqBodyInterface {
  uuid: string;
}

export interface retrieveUserProfileResBodyInterface {}

export interface updateUsernameReqBodyInterface {
  uuid: string;
  username: string
}

export interface updateUsernameResBodyInterface {}

export interface decodedRefreshTokenInteraface extends JwtPayload {
  uuid: string;
}
