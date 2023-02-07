import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class CreateFunctionController {

    public async createFunction(req: Request, res: Response){
        
        try {
            const Cliente = prismaClient.function;
            const newFunction = req.body;

         await Cliente
               .create({
                    data:{...newFunction}
                });

            return res.json({message:'Nova funcao cadastrada!'}).status(200);

        } catch (error: unknown) {
            const { message } = error as Error;

            return res.status(500).json(message) 
        }
    }


}

export default new CreateFunctionController()
