import { Document } from "mongoose";

export interface ISocialToken extends Document {
  provider: string,
  providerUserId: string,
  userId: string,
}
