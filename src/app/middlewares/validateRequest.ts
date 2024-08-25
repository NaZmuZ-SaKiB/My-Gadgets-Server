import { RequestHandler } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) =>
  (async (req, res, next) => {
    try {
      const parse = await schema.parseAsync({
        body: req.body,
      });
      req.body = parse.body;

      next();
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;

export default validateRequest;
