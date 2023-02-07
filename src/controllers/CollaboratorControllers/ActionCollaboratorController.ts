import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class ActionCollaboratorController {

    public async actionCollaborator(req: Request, res: Response){
        
        try {
            const Cliente = prismaClient.collaborator;
            const { idColaborador } = req.params;
            const dataCollaborator = req.body;

            let collaborator = await Cliente.findUnique({ where: {idColaborador: Number(idColaborador)} });

            if(!collaborator){
                return res.json({message:'Nao foi possivel encontrar este colaborador!'}).status(404);
            }

            collaborator = await Cliente.update({
                where: {idColaborador: Number(idColaborador)},
                data: {
                    ...dataCollaborator,
                    updatedAt: new Date(),
                }
            }) 
                         
            return res.json(`Colaborador ${Number(dataCollaborator.status) === 1 ? 'Ativado' : 'Desativado'}`).status(200);

        } catch (error: unknown) {
            const { message } = error as Error;

            return res.status(500).json(message) 
        }
    }

}

export default new ActionCollaboratorController()