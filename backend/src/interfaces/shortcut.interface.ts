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


// Interfaces for createShortcut controller
export interface createShortcutReqBodyInterface {
  shortcut: string;
  original: string;
  uuid: string;
}

export interface createShortcutResBodyInterface {}

// Interfaces for getShortcut controller
export interface getShortcutReqParamsInterface {
  shortcut: string;
}

// Interfaces for retrieveOwnerShortcutDetails controller
export interface retrieveOwnerShortcutDetailsReqBodyInterface {
  uuid: string
}

export interface retrieveOwnerShortcutDetailsResBodyInterface {}
