import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import {
  createShortcutReqBodyInterface,
  createShortcutResBodyInterface,
  getShortcutReqParamsInterface
} from '../interfaces/shortcut.interface';
import Shortcut from '../models/shortcut.model';
import User from '../models/user.model';

export const createShortcut: RequestHandler<
  ParamsDictionary,
  createShortcutResBodyInterface,
  createShortcutReqBodyInterface
> = async (req, res) => {
  try {
    const { shortcut, original, uuid } = req.body;

    // Usine email provided by JWT, ensure shortcut owner is present
    const shortcutOwner = await User.findById(uuid);

    if (!shortcutOwner) {
      return res.status(400).json({
        code: 400,
        message: 'Every shortcut must have an owner'
      });
    }

    // Ensure that the fields are not undefined
    if (!shortcut) {
      return res.status(400).json({
        code: 400,
        message: 'Shortcut is a required field'
      });
    } else if (!original) {
      return res.status(400).json({
        code: 400,
        message: 'Original link is a required field'
      });
    }

    // Checking DB to see if shortcut is already present
    const shortcutFound = await Shortcut.findOne({ shortcut });

    // Shortcut already present, return error
    if (shortcutFound) {
      return res.status(400).json({
        code: 400,
        message: 'Shortcut is already in use, choose another one'
      });
    }

    // Shortcut not present, create a new shortcut record
    await Shortcut.create({
      shortcut: shortcut,
      original: original,
      owner: shortcutOwner._id
    });

    return res.status(201).json({
      code: 201,
      message: 'Shortcut created'
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error'
    });
  }
};

export const getShortcut: RequestHandler<getShortcutReqParamsInterface> = async (req, res) => {

  // Retrieve shortcut id from request params
  const { shortcut } = req.params;

  // Find if shortcut id present in db
  const shortcutPresent = await Shortcut.findOne({ shortcut });

  if (!shortcutPresent) {
    return res.status(404).json({
      code: 404,
      message: 'Shortcut is invalid'
    })
  }

  res.status(302).send({
    code: 302,
    redirect: shortcutPresent.original
  })

};
