import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class FindUnityController {

    public async findUnity(req: Request, res: Response){

        try {
            const Cliente = prismaClient.unity;
            const { idUnidade } = req.params;

            const Unity = await Cliente.findUnique({ where: {idUnidade: Number(idUnidade)} });

            if(!Unity){
                return res.json({message:'Nao foi possivel encontrar esta unidade!'}).status(404);
            }

            return res.json({unidade:Unity}).status(200);

        } catch (error: unknown) {
            const { message } = error as Error;

            return res.status(500).json(message) 
        }
    }
}

export default new FindUnityController()
