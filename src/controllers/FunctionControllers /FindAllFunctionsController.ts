import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class FindAllFunctionsController {

    public async findAllFunctions(req: Request, res: Response){
        
        try {
            const Cliente = prismaClient.function;
            const Functions = await Cliente.findMany();

            if(!Functions){
                return res.json({message:'Nenhum resultado encontrado!'}).status(404);
            }

            return res.json({data:Functions}).status(200);

        } catch (error: unknown) {
            const { message } = error as Error;

            return res.status(500).json(message) 
        }
    }

}

export default new FindAllFunctionsController()
