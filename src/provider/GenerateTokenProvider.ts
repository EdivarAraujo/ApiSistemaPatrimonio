import { sign } from 'jsonwebtoken';

class GenerateTokenProvider {

    async execute(userId: string){
        const token = sign({id:userId},process.env.SECRET_KEY,{
            subject: String(userId),
            expiresIn:'1min'
          });

        return token;
        }

}

export default new GenerateTokenProvider();