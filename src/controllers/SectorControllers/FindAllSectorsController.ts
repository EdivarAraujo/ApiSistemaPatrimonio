import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class FindAllSectorsController {

    public async findAllSectors(req: Request, res: Response){
        
        try {
            const Cliente = prismaClient.sector;
            const Sectors = await Cliente.findMany();

            if(!Sectors){
                return res.json({message:'Nenhum resultado encontrado!'}).status(404);
            }

            return res.json({data:Sectors}).status(200);

        } catch (error: unknown) {
            const { message } = error as Error;

            return res.status(500).json(message) 
        }
    }

}

export default new FindAllSectorsController()
