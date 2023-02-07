import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class UpdateFunctionController {

    public async updateFunction(req: Request, res: Response){
        
        try {
            const Cliente = prismaClient.function;
            const { idFuncao } = req.params;
            const dataFunction = req.body;

            let Function = await Cliente.findUnique({ where: {idFuncao: Number(idFuncao)} });

            if(!Function){
                return res.json({message:'Nao foi possivel encontrar esta funcao!'}).status(404);
            }

            Function = await Cliente.update({
                where: {idFuncao: Number(idFuncao)},
                data: {
                    ...dataFunction,
                    updatedAt: new Date(),
                }
            }) 
                         
            return res.json(Function).status(200);

        } catch (error: unknown) {
            const { message } = error as Error;

            return res.status(500).json(message) 
        }
    }


}

export default new UpdateFunctionController()
