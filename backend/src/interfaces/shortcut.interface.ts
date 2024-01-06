import { Document } from 'mongoose';

export interface IShortcut extends Document {
  shortcut: string;
  original: string;
  createdOn: Date;
  numClicks: number;
  clickLimit: number;
  owner: string;
  password: string;
}

export interface createShortcutReqBodyInterface {
  shortcut: string;
  original: string;
  uuid: string;
}

export interface createShortcutResBodyInterface {}

export interface getShortcutReqParamsInterface {
  shortcut: string
}
