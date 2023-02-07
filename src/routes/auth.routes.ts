import {
    AuthController,
    RefreshTokenUserController
} from '../controllers/AuthControllers';
export default class AuthRoutes {

    constructor(router){
        this.initDefineRoutes(router);
    }

    private initDefineRoutes(router){
        router.post('/auth',AuthController.authenticate);
        router.post('/refreshToken',RefreshTokenUserController.handle);
    }

}



