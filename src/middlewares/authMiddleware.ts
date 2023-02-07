import {Request, Response, NextFunction } from 'express';
import {verify} from 'jsonwebtoken';

    interface TokenPlayload {
        idUsuario : string;
        iat : number;
        exp : number;
    }


export default function authMiddleware(req: Request, res: Response, next: NextFunction){
        const { authorization } = req.headers;

        if(!authorization){
            return res.status(401).json({ message: 'Token nao enviado!'});
        }

    const token = authorization.replace('Bearer', '').trim();
    
    try {
        const data = verify(token.replace(/[\\"]/g, ''), process.env.SECRET_KEY);
        const { idUsuario } = data as TokenPlayload;

        req.userId = idUsuario;

        return next();
    } catch {
        return res.status(401).json({
            message: 'Token Invalido!',
            authorization
        });
    }
}