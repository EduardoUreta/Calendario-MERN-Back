import { EventoModel as Evento } from "../models/Evento.js";

export class EventsController {

    static getEvents = async(req, res, next) => {
        try {
            const events = await Evento.find().populate('user', 'name');
            // Con populate, traigo la información de esa pseudo FK
            if(events.length > 0) {
                return res.status(200).json({"Eventos": events});
            } else {
                res.status(404).json({"Eventos": "No hay eventos"})
            }
        } catch (error) {
            res.status(500).json({message: "Internal Server Error"})
        }
    };

    static createEvent = async(req, res, next) => {
        const data = req.body;
        try {
            data.user = req.user._id;
            const newEvent = await Evento.create(data);
            res.status(201).json(newEvent)
        } catch (error) {
            res.status(500).json({message: "Internal Server Error"})
        }
    };

    static updateEvent = async(req, res, next) => {
        const eventId = req.params.id;
        const userId = req.user._id;
        const data = req.body;
        try {
            const evento = await Evento.findById(eventId);
            if(!evento) {
                res.status(200).json({message: "No existe el evento"});
            } else if ( evento && evento.user.toString() !== userId) {
                res.status(401).json({message: "No estás autorizado para editar este evento"});
            } else if ( evento && evento.user.toString() === userId) {
                await Evento.findByIdAndUpdate(eventId, data, {new: true});
                res.status(200).json({message: "El evento fue actualizado"});
            };
        } catch (error) {
            res.status(500).json({message: "Internal Server Error"})
        }
    };

    static deleteEvent = async(req, res, next) => {
        const eventId = req.params.id;
        const userId = req.user._id;
        try {
            const evento = await Evento.findById(eventId);
            if(!evento) {
                res.status(200).json({message: "No existe el evento"});
            } else if ( evento && evento.user.toString() !== userId) {
                res.status(401).json({message: "No estás autorizado para eliminar este evento"});
            } else if ( evento && evento.user.toString() === userId) {
                await Evento.findByIdAndDelete(eventId);
                res.status(200).json({message: "El evento fue eliminado"});
            };
        } catch (error) {
            res.status(500).json({message: "Internal Server Error"})
        }
    };

};