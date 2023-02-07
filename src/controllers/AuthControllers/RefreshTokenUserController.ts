import { Request, Response } from 'express';
import RefreshTokenUserUseCase from './RefreshTokenUserUseCase';


class RefreshTokenUserController{

    async handle(req:Request, res:Response){
      try {
        const { refreshToken } = req.body;
        
        const token = await RefreshTokenUserUseCase.execute(res, refreshToken.replace(/[\\"]/g, ''));

        return res.json(token);
        
      } catch (error) {

        return res.status(500).json(error.message);
        
      }
    }

}

  export default  new RefreshTokenUserController()