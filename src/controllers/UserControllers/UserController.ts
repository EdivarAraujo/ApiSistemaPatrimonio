import {Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';
import bcrypt from 'bcryptjs';

class CreateUserController {

    public async createUser(req: Request, res: Response){
        
        try {
            const Cliente = prismaClient.user;
            const {nome,userName,email,password} = req.body;
            const collaboratorUser = await Cliente.findFirst({where: { userName } });
            const collaboratorEmail = await Cliente.findFirst({where: { email } });

            if(collaboratorUser || collaboratorEmail){
                return res.json({message:'Opa, nome de usuario ou email ja existente!'}).status(404);
            }

         await Cliente
               .create({
                    data:{  
                        nome,
                        userName,
                        email,
                        password: bcrypt.hashSync(password, 8)
                    }
                });

            return res.json({message:'Novo usuario cadastrado!'}).status(200);

        } catch (error: unknown) {
            const { message } = error as Error;

            return res.status(500).json({message: message}); 
        }
    }
}

export default new CreateUserController()