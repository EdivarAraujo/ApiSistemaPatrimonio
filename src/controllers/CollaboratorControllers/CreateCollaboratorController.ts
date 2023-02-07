import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

class CreateCollaboratorController {

    public async createCollaborator(req: Request, res: Response){
        
        try {
            const Cliente = prismaClient.collaborator;
            const newCollaborator = req.body;
            const numeroPatrimonio = newCollaborator?.numeroPatrimonio;
            const collaborator = await Cliente.findUnique({where: { numeroPatrimonio }});

            if(collaborator){
                return res.json({message:'Opa, numero de patrimonio ja existente!'}).status(404);
            }

         await Cliente
               .create({
                    data:{...newCollaborator}
                });

            return res.status(201).json({message:'Novo colaborador cadastrado!'});

        } catch (error: unknown) {
            const { message } = error as Error; 

            return res.status(500).json(message) 
        }
    }
}

export default new CreateCollaboratorController()