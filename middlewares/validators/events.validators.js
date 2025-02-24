import { check } from "express-validator";
import { validationResultMiddleware } from "./validationResult.js";
import moment from "moment/moment.js";

const isDate = (value) => {
    if(!value) return false;
    const fecha = moment(value);
    if(fecha.isValid()) return true;
};

export const validateCreateEvent = [ 
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorioa').custom(isDate),
    check('end', 'Fecha de término es obligatorio').isLength({min: 6}),
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    validationResultMiddleware
];
