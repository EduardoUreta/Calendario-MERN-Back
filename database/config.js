import mongoose from "mongoose";

export const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Conectado a la BD');
    } catch (error) {
        console.error(error);
        throw new Error("Error a conectarse a la BD");
    };
};