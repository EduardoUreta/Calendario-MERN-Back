import { UsuarioModel as Usuario } from "../models/Usuario.js";
import { hash } from "argon2";
import { verifyPassword, generateJWT } from "../utils/index.js";

export class AuthController {

    static createUser = async(req, res, next) => {
        const { name, email, password } = req.body;
        try {
            let usuario = await Usuario.findOne({ email: email });
            if(usuario) return res.status(400).json({message: "El correo ya está siendo utilizado"});     
            
            usuario = new Usuario(req.body);
            usuario.password = await hash(password);
            await usuario.save();

            res.status(201).json({ ok: true, message: "Usuario Creado"})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Error al crear al usuario"});
        };
    };

    static loginUser = async(req, res, next) => {
        const { email, password} = req.body;
        try {
            const usuario = await Usuario.findOne({ email: email });
            if(!usuario) return res.status(404).json({message: "Credenciales Inválidas"});
            
            const validPassword = await verifyPassword(password, usuario.password);
            if(!validPassword) return res.status(404).json({message: "Credenciales Inválidas"});

            // Crear Firma JWT
            const token = await generateJWT({
                _id: usuario.id, 
                name: usuario.name
            });

            return res.cookie('Bearer', token, { samesite: 'None', secure: true}).json({message: "Usuario logueado"});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Error al iniciar sesión"});
        };
    };

}