import { Document } from 'mongoose';

export interface IShortcut extends Document {
  shortcut: string;
  original: string;
  createdOn: string;
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

// Interfaces for removeShortcut controller
export interface removeShortcutReqParamsInterface {
  shortcut: string;
}

export interface removeShortcutReqBodyInterface {
  uuid: string;
}

export interface removeShortcutResBodyInterface {}

// Interfaces for retrieveOwnerShortcutDetails controller
export interface retrieveOwnerShortcutDetailsReqBodyInterface {
  uuid: string;
}

export interface retrieveOwnerShortcutDetailsResBodyInterface {}

// Interfaces for updateShortcut controller
export interface updateShortcutReqBodyInterface {
  original: string;
  shortcut: string;
  uuid: string;
}

export interface updateShortcutResBodyInterface {}
