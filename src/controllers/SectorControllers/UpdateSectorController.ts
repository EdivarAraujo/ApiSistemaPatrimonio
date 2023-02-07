import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class UpdateSectorController {

    public async updateSector(req: Request, res: Response){
        
        try {
            const Cliente = prismaClient.sector;
            const { idSetor } = req.params;
            const dataSector = req.body;

            let sector = await Cliente.findUnique({ where: {idSetor: Number(idSetor)} });

            if(!sector){
                return res.json({message:'Nao foi possivel encontrar este setor!'}).status(404);
            }

            sector = await Cliente.update({
                where: {idSetor: Number(idSetor)},
                data: {
                    ...dataSector,
                    updatedAt: new Date(),
                }
            }) 
                         
            return res.json(sector).status(200);

        } catch (error: unknown) {
            const { message } = error as Error;

            return res.status(500).json(message) 
        }
    }


}

export default new UpdateSectorController()
