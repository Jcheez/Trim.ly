import { JwtPayload } from 'jsonwebtoken';

export interface verifyJWTReqBodyInterface {
  uuid: string;
}

export interface verifyJWTResBodyInterface {}

export interface decodedTokenInteraface extends JwtPayload {
  uuid: string;
}
