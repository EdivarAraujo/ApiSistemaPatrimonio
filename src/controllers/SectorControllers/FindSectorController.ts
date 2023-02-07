import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class FindSectorController {

    public async findSector(req: Request, res: Response){

        try {
            const Cliente = prismaClient.sector;
            const { idSetor } = req.params;

            const Sector = await Cliente.findUnique({ where: {idSetor: Number(idSetor)} });

            if(!Sector){
                return res.json({message:'Nao foi possivel encontrar este setor!'}).status(404);
            }

            return res.json({unidade:Sector}).status(200);

        } catch (error: unknown) {
            const { message } = error as Error;

            return res.status(500).json(message) 
        }
    }
}

export default new FindSectorController()
