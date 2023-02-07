import dayjs from 'dayjs';
import { prismaClient } from '../database/prismaClient'

class GenerateRefreshToken {

    async execute(userId: number){
        const expiresIn =  dayjs().add(60,"second").unix();
        const generateRefreshToken = await prismaClient.refreshToken.create({
            data:{
                userId,
                expiresIn
            }
        })

        return generateRefreshToken;
    }


}

export default new GenerateRefreshToken() ;