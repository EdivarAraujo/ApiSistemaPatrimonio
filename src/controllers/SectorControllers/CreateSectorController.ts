import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class CreateSectorController {

    public async createSector(req: Request, res: Response){
        
        try {
            const Cliente = prismaClient.sector;
            const newSector = req.body;

         await Cliente
               .create({
                    data:{...newSector}
                });

            return res.json({message:'Novo setor cadastrado!'}).status(200);

        } catch (error: unknown) {
            const { message } = error as Error;

            return res.status(500).json(message) 
        }
    }


}

export default new CreateSectorController()
