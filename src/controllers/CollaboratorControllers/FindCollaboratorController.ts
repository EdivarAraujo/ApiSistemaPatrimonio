import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class FindCollaboratorController {

    public async findCollaborator(req: Request, res: Response){
        
        try {
            const Cliente = prismaClient.collaborator;
            const { idColaborador } = req.params;

            const collaborator = await Cliente.findUnique({ where: {idColaborador: Number(idColaborador)} });

            if(!collaborator){
                return res.json({message:'Nao foi possivel encontrar este colaborador!'}).status(404);
            }

            return res.json({user:collaborator}).status(200);

        } catch (error: unknown) {
            const { message } = error as Error; 

            return res.status(500).json(message) 
        }
    }

}

export default new FindCollaboratorController()