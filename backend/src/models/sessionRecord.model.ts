import { Schema, model, Model } from 'mongoose';
import { ISessionRecords } from '../interfaces/sessionRecord.interface';

const sessionRecordSchema = new Schema<ISessionRecords>({
  sessionId: {
    type: String,
    required: true
  },

  nonce: {
    type: String,
    required: true
  },

  codeVerifier: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30*60
  }
})

const SessionRecord: Model<ISessionRecords> = model<ISessionRecords>('session-records', sessionRecordSchema)

export default SessionRecord
