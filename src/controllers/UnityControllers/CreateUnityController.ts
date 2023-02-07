import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class CreateUnityController {

    public async createUnity(req: Request, res: Response){
        
        try {
            const Cliente = prismaClient.unity;
            const newUnity = req.body;

         await Cliente
               .create({
                    data:{...newUnity}
                });

            return res.json({message:'Nova unidade cadastrada!'}).status(200);

        } catch (error: unknown) {
            const { message } = error as Error;

            return res.status(500).json(message) 
        }
    }


}

export default new CreateUnityController()
