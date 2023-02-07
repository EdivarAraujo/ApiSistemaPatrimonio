import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class FindAllUnitsController {

    public async findAllUnits(req: Request, res: Response){
        
        try {
            const Cliente = prismaClient.unity;
            const Units = await Cliente.findMany();

            if(!Units){
                return res.json({message:'Nenhum resultado encontrado!'}).status(404);
            }

            return res.json({data:Units}).status(200);

        } catch (error: unknown) {
            const { message } = error as Error;

            return res.status(500).json(message) 
        }
    }

}

export default new FindAllUnitsController()
