import jwt from "jsonwebtoken"

export const generateJWT = (payload) => {
    return new Promise( (resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" }, 
            (err, token) => {
                if(err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                }
                resolve(token);
            },
        );
    });
};

export const validTokenJWT = (req, res, next) => {
    const token = req.cookies;

    if (token.Bearer) {
        try {
            const payload = jwt.verify(token.Bearer, process.env.JWT_SECRET);
            req.user = payload;
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Token no válido o expirado' });           
        };
    } else {
        return res.status(404).json({ message: 'No hay token' });  
    };
};

