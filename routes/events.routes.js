// Obtener eventos, validados por JWT
import { Router } from "express";
import { EventsController } from "../controllers/index.js";
import { validTokenJWT } from "../utils/index.js";
import { validateCreateEvent } from "../middlewares/validators/events.validators.js";

export const eventsRoutes = Router();

// Que todos pasen por validToken
eventsRoutes.use(validTokenJWT);

eventsRoutes.get("/", EventsController.getEvents);
eventsRoutes.post("/", EventsController.createEvent);
eventsRoutes.put("/:id", EventsController.updateEvent);
eventsRoutes.delete("/:id", EventsController.deleteEvent);