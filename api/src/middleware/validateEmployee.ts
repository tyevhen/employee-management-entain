import { Request, Response, NextFunction } from "express";

const { body, validationResult } = require("express-validator");

export const validateEmployee = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string"),
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string"),
  body("birthDate")
    .notEmpty()
    .withMessage("Birth date is required")
    .isISO8601()
    .withMessage("Invalid birth date format")
    .toDate()
    .custom((value: Date) => {
      if (value > new Date()) {
        throw new Error("Birth date cannot be in future");
      }
      return true;
    }),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isString()
    .withMessage("Phone number must be a string"),
  body("officeId")
    .if((_value: any, { req }: any) => req.method === "POST")
    .isUUID()
    .withMessage("Invalid office ID"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);    

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
