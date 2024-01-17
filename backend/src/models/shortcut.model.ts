import { Schema, model, Model } from 'mongoose';
import { IShortcut } from '../interfaces/shortcut.interface';

const shortcutSchema = new Schema<IShortcut>({
  shortcut: {
    type: String
  },

  original: {
    type: String,
    required: [true, 'Original Link missing']
  },

  createdOn: {
    type: Date,
    required: true,
    default: Date.now()
  },

  numClicks: {
    type: Number,
    required: true,
    default: 0
  },

  clickLimit: {
    type: Number
  },

  owner: {
    type: String
  },

  password: {
    type: String
  }
});

shortcutSchema.pre('save', function (next) {
  if (this.shortcut === undefined) {
    this.shortcut = this.id;
  }
  next();
});

const Shortcut: Model<IShortcut> = model<IShortcut>(
  'Shortcuts',
  shortcutSchema
);

export default Shortcut;
