import React, { Dispatch, SetStateAction } from 'react';

export interface TextFieldWithTitleProps {
  placeholder: string;
  type: string;
  title: string;
  handleSetState: Dispatch<SetStateAction<string>>;
  value: string;
  error: string;
}

export interface ErrorAlertProps {
  autoHideDuration: number;
  handleClose: () => void;
  open: boolean;
  message: string;
}

export interface ShortcutTableListProps {
  linkData: linkDataInterface[]
}

export interface CreateShortcutDialogProps {
  open: boolean,
  onClose: () => void,
  setLinkData: Dispatch<SetStateAction<linkDataInterface[]>>;
}

export interface authContextInterface {
  authState: string;
  setAuthState: Dispatch<SetStateAction<string>>;
  AuthenticatedRoutes: React.ElementType;
  UnAuthenticatedRoutes: React.ElementType;
}

export interface linkDataInterface {
  shortcut: string,
  original: string,
  createdOn: string
}


