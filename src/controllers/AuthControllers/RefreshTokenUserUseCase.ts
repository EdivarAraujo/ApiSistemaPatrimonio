import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import GenerateTokenProvider from '../../provider/GenerateTokenProvider';
import dayjs from 'dayjs';
import GenerateRefreshToken from '../../provider/GenerateRefreshToken';

class RefreshTokenUserUseCase{

    public async execute(res:Response,refresh_token: string): Promise<any> {

      const refreshToken = await prismaClient.refreshToken.findFirst({
        where:{
            id: refresh_token
         }
      })

      if(!refreshToken){
        return res.status(401).json({message:'Refresh Token Not Found!'})
      }

      const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));
      const token = await GenerateTokenProvider.execute(String(refreshToken.userId));

      if(refreshTokenExpired){

        await prismaClient.refreshToken.deleteMany({
          where:{
            userId: refreshToken.userId
          }
        })

       const newRefreshToken = await GenerateRefreshToken.execute(refreshToken.userId);

        return { token, refreshToken:newRefreshToken.id }

      }
      
      return {token, refreshToken:refresh_token};

  }

}

  export default  new RefreshTokenUserUseCase()