import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class FindFunctionController {

    public async findFunction(req: Request, res: Response){

        try {
            const Cliente = prismaClient.function;
            const { idFuncao } = req.params;

            const Function = await Cliente.findUnique({ where: {idFuncao: Number(idFuncao)} });

            if(!Function){
                return res.json({message:'Nao foi possivel encontrar esta funcao!'}).status(404);
            }

            return res.json({unidade:Function}).status(200);

        } catch (error: unknown) {
            const { message } = error as Error;

            return res.status(500).json(message) 
        }
    }
}

export default new FindFunctionController()
