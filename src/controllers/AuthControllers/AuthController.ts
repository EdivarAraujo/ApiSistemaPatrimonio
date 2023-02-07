import {Request,Response} from 'express';
import { prismaClient } from '../../database/prismaClient';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import GenerateRefreshToken from '../../provider/GenerateRefreshToken';
import GenerateTokenProvider from '../../provider/GenerateTokenProvider'

interface User {
  idUsuario: string;
  userName: string;
  password: string;
}

class AuthController{
 async authenticate(req:Request, res:Response){

  try {
  
    const client = prismaClient.user;
    const{userName,password} = req.body;

    const user = await client.findUnique({ where: { userName } }) as unknown as User;

    if(!user){
      return res.status(200).json({
          status: false,
          message:'Usuario nao encontrado!'
        });
   }

    //Verifica se a senha esta correta
    const isValidPassword = await bcrypt.compare(password,user.password);

    if(!isValidPassword){
      return res.status(200).json({
        status:false,
        message:'Senha incorreta!'
      });
    }

    //Gerar o token do usuario
    const token = await GenerateTokenProvider.execute(user.idUsuario);

    const isExistRefreshToken = await prismaClient.refreshToken.findUnique({ where:{ userId : Number(user.idUsuario) }});

    if(isExistRefreshToken){
      await prismaClient.refreshToken.deleteMany({
        where:{userId: Number(user.idUsuario)}
      })
    }

    const refreshToken = await GenerateRefreshToken.execute(parseInt(user.idUsuario));
    
    delete user.password;
    
    return res.status(200).json({
        status:true,
        user,
        token,
        refreshToken
    });
    
  } catch (error: unknown) {
    const { message } = error as Error;

    return res.status(401).json({
      message:'Ocorreu um erro interno!',
      error: message
    });
  }

}}

export default new AuthController();