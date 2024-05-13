import { Document } from "mongoose";

export interface ISessionRecords extends Document {
  sessionId: string,
  nonce: string,
  codeVerifier: string,
  createdAt: Date
}
