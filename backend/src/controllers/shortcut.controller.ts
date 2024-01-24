import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import {
  createShortcutReqBodyInterface,
  createShortcutResBodyInterface,
  getShortcutReqParamsInterface,
  retrieveOwnerShortcutDetailsReqBodyInterface,
  retrieveOwnerShortcutDetailsResBodyInterface
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
      owner: shortcutOwner.id
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

export const getShortcut: RequestHandler<
  getShortcutReqParamsInterface
> = async (req, res) => {
  try {
    // Retrieve shortcut id from request params
    const { shortcut } = req.params;

    // Find if shortcut id present in db
    const shortcutPresent = await Shortcut.findOne({ shortcut });

    if (!shortcutPresent) {
      return res.status(404).json({
        code: 404,
        message: 'Shortcut is invalid'
      });
    }

    return res.status(302).send({
      code: 302,
      redirect: shortcutPresent.original
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error'
    })
  }
};

export const retrieveOwnerShortcutDetails: RequestHandler<ParamsDictionary, retrieveOwnerShortcutDetailsResBodyInterface, retrieveOwnerShortcutDetailsReqBodyInterface> = async (req, res) => {
  try {
    // uuid is retrieved from jwt token
    const { uuid } = req.body

    //Find shortcuts that are created by this uuid
    const links = await Shortcut.find({ owner: uuid }, { numClicks: 0, _id: 0, __v: 0, owner: 0 })

    // Return the data back to requester
    res.status(200).send({
      code: 200,
      data: links
    })
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error'
    })
  }
}
