import { Schema, model, Model } from 'mongoose';
import { ISocialToken } from '../interfaces/socialToken.interface';

const socialTokenSchema = new Schema<ISocialToken>({
  provider: {
    type: String,
    enum: ['SP']
  },

  providerUserId: {
    type: String,
    required: true
  },

  userId: {
    type: String,
    required: true
  }
})

const SocialToken: Model<ISocialToken> = model<ISocialToken>('social-tokens', socialTokenSchema)

export default SocialToken
