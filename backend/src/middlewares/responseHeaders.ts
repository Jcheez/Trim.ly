import { RequestHandler } from "express";

export const responseHeaders: RequestHandler = async (req, res, next) => {
  res.set('Cache-Control', 'no-store')
  res.set('Content-Type', 'application/json; charset=utf-8')
  next()
}
