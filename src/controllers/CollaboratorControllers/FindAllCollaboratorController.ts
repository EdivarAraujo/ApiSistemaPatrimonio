import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class FindAllCollaboratorController {

    public async findAllContributors(req: Request, res: Response){
        
        try {
            const Cliente = prismaClient.collaborator;
            const Contributors = await Cliente.findMany();

            if(!Contributors){
                return res.json({message:'Nao foi possivel encontrar este colaborador!'}).status(404);
            }

            return res.json({data:Contributors}).status(200);

        } catch (error: unknown) {
            const { message } = error as Error; 

            return res.status(500).json(message) 
        }
    }

}

export default new FindAllCollaboratorController()