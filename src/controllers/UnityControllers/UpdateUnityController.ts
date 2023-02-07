import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class UpdateUnityController {

    public async updateUnity(req: Request, res: Response){
        
        try {
            const Cliente = prismaClient.unity;
            const { idUnidade } = req.params;
            const dataUnity = req.body;

            let unity = await Cliente.findUnique({ where: {idUnidade: Number(idUnidade)} });

            if(!unity){
                return res.json({message:'Nao foi possivel encontrar este colaborador!'}).status(404);
            }

            unity = await Cliente.update({
                where: {idUnidade: Number(idUnidade)},
                data: {
                    ...dataUnity,
                    updatedAt: new Date(),
                }
            }) 
                         
            return res.json(unity).status(200);

        } catch (error: unknown) {
            const { message } = error as Error;

            return res.status(500).json(message) 
        }
    }


}

export default new UpdateUnityController()
