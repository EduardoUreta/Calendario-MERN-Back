import { check } from "express-validator";
import { validationResultMiddleware } from "./validationResult.js";

export const validateCreateUser = [ 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres mínimo').isLength({min: 6}),
    validationResultMiddleware
];

export const validLogin = [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres mínimo').isLength({min: 6}),
    validationResultMiddleware
];